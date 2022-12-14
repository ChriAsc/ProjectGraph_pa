import { alpha } from '..';
import { ErrEnum } from '../Factory/errorFactory';
import { Execution } from '../Models/executions';
import { GraphModel } from '../Models/graph';
import { User } from '../Models/user';

const dotenv = require('dotenv');
const Graph = require('node-dijkstra');

dotenv.config();

/**
 * Classe che implementa il controller del modello
**/
export class graphController {

    /* Metodo che consente di inserire un nuovo modello */
    public newGraphModel = async (req, res, next) => {
        
        const graphModel = new GraphModel();
        const userModel = new User();
        try {
            // prima di creare il modello, si verifica che lo user abbia credito sufficiente
            let total_cost: number = await graphModel.getCost(req.body);
            let budget: number = await userModel.getBudget(req.user.username);
            if(total_cost > budget) {
                next(ErrEnum.Unauthorized);
            } else {
                // se lo user ha credito sufficiente, si può procedere con la creazione
                await graphModel.addGraphModel(req.user.username, req.body);
                // si aggiorna il credito dell'utente
                let new_budget: number = budget - total_cost;
                await userModel.updateBudget(req.user.username, new_budget);
                res.status(201).send({ Message: "Inserimento avvenuto con successo." });
            } 
            next();
        } catch (err) {
            next(ErrEnum.BadRequest);
        }
        
    }

    /* Metodo che consente di eseguire un modello da parte di un utente */
    public execModel = async (req, res, next) => {
        const graphModel = new GraphModel();
        const userModel = new User();
        const execModel = new Execution();
        try{
            // prima di eseguire il modello, si verifica che lo user abbia credito sufficiente
            let graph_struct: any = await graphModel.getGraphStruct(req.body.id);
            let total_cost: number = await graphModel.getCost(graph_struct);
            let budget: any = await userModel.getBudget(req.user.username);
            if(total_cost > budget) {
                next(ErrEnum.Unauthorized);
            } else {
                let new_budget: number = budget - total_cost;
                await userModel.updateBudget(req.user.username, new_budget);
                // se lo user ha credito sufficiente, si può procedere
                let start: string = req.body.start;
                let goal: string = req.body.goal;
                const route = new Graph(graph_struct);
                const start_time: number = new Date().getTime();

                let resultObj: any = await route.path(start, goal, { cost: true }); // si calcola il percorso ottimo
                let elapsed: number = new Date().getTime() - start_time;    // si calcola il tempo si esecuzione

                let weightCost: number = resultObj.cost;
                let optPath: any = resultObj.path;
                // creazione della nuova
                let result: any = await execModel.addExec(elapsed, req.body.id, start, goal, weightCost, optPath, total_cost);
                
                res.status(200).send({ Result: result });
            }
        } catch(err) {
            next(ErrEnum.BadRequest);
        }
    }

    /* Metodo che consente di gestire la richiesta di cambio peso da parte di un utente autenticato */
    public changeEdgeWeight = async (req, res, next) => {
        const graphModel = new GraphModel();

        let modelId: number = req.body.id;
        if (typeof modelId !== 'number') next(ErrEnum.MalformedPayload);

        try {
            // la lunghezza dell'array è necessaria per capire quanti archi devono essere modificati
            let arr_length: number = req.body.toChange.length;
            

            for (let i = 0; i < arr_length; i++) {
                // si seleziona il grafo attuale
                var actual_g: any = req.body.toChange[i];

                // si controlla il valore del peso
                if(typeof actual_g.weight !== "number") next(ErrEnum.NaNWeight);
                // variabili dell'attuale arco
                var node_1: string = actual_g.edge[0];
                var node_2: string = actual_g.edge[1];
                var proposedWeight: number = actual_g.weight;

                var actual_weight: number = await graphModel.getWeight(modelId, node_1, node_2);    // peso prima della modifica

                var newWeight: number = alpha*(actual_weight) + (1 - alpha)*(proposedWeight);   // nuovo peso          

                // nuovo grafo
                var newGraph: any = await graphModel.changeWeight(modelId, node_1, node_2, newWeight);
                var old_version: number = await graphModel.getVersion(modelId); // si considera la versione del modello di provenienza

                var new_version: number = (old_version + i + 1);
                // si aggiorna il modello, creandone uno nuovo ma con una versione differente
                var foo = await graphModel.addGraphModel(req.user.username, newGraph, new_version);

                console.log(`Cambio peso dell'arco ${node_1}${node_2} avvenuto con successo.`);
            }

            res.status(201).send({ Message: "Cambio peso avvenuto correttamente!" });            
            next();
        } catch(err) {
            next(ErrEnum.BadRequest);
        }
    }

    /* Metodo che restituisce l'elenco dei modelli associati all'utente filtrati per numeri di nodi e numero di archi */
    public filterModels = async (req, res, next) => {
        const graphModel = new GraphModel();
        try {
            let nr_nodes: number = parseInt(req.params.nodes);
            let nr_edges: number = parseInt(req.params.edges);
            let result: any = [];
            // si ricavano tutti i modelli associati all'utente autenticato
            let models = await graphModel.getGraphModels(req.user.username); 
            
            for(let x in models) {
                var nnodes: number = await graphModel.getNrNodes(JSON.parse(models[x].graph_struct));
                var nedges: number = await graphModel.getNrEdges(JSON.parse(models[x].graph_struct));
                if( nnodes === nr_nodes &&  nedges === nr_edges) {
                    // si scelgono solamente i grafi che hanno il numero di nodi e di archi specificato
                    let filteredGraph: any = { model_id: models[x].model_id, graph_struct: JSON.parse(models[x].graph_struct), model_version: models[x].model_version};

                    result.push(filteredGraph);
                }
            }
            res.status(201).send({ Message: `Modelli disponibili con ${nr_nodes} nodi e ${nr_edges} archi`, Models: result });
            next();
        } catch (err) {
            next(ErrEnum.Forbidden);
        }
    }

    /* Metodo che consente di cancellare uno o più modelli */
    public deleteModel = async (req, res, next) => {
        const graphModel = new GraphModel();
        try {
            // se sono presenti più modelli da eliminare, si deve splittare la stringa
            let str: any = req.params.ids;
            const params = str.split('&');

            for(const x in params) {
                // si considera un modello per volta e si verifica l'utente
                var actual_id: number = parseInt(params[x]);
                if(await graphModel.getCreator(actual_id) == req.user.username) {
                    await graphModel.deleteGraphModel(actual_id);
                    console.log(`Eliminazione del modello ${actual_id} avvenuta!` )
                } else {
                    next(ErrEnum.Unauthorized);
                }
            }

            res.status(201).send({ Message: "Eliminazione completata con successo."});
            next();
        } catch (err) {
            next(ErrEnum.Forbidden);
        }
    }

    /* Metodo che restituisce l'elenco delle esecuzioni */
    public getExecutions = async (req, res, next) => {
        const execModel = new Execution();
        try {
            let executions: any = await execModel.getAllExec();
            // si ottengono tutte le esecuzioni sottoforma di JSON
            res.status(201).send({ Message: "Esecuzioni", Executions: executions });
            next();
        } catch (err) {
            next(ErrEnum.Generic);
        }
    }

    /* Metodo che consente di effettuare una simulazione */
    public startSimulation = async (req, res, next) => {
        const graphModel = new GraphModel();
        try {
            // variabili del body
            let node_1: string = req.body.edge[0];                // estremo dell'arco da cambiare
            let node_2: string = req.body.edge[1];                // l'altro estremo dell'arco da cambiare
            let start_weight: number = req.body.startWeight;    // peso iniziale
            let stop_weight: number = req.body.stopWeight;      // peso finale
            let step: number = req.body.step;                   // passo
            let start_node: string = req.body.startNode;        // nodo di partenza
            let goal_node: string = req.body.goalNode;          // nodo di arrivo

            let result: string[] = [];
            let best: any;
            let best_struct: any;

            let tmp: number = start_weight;
            let limit: number = (stop_weight - start_weight)/step;

            for(let i = 0; i <= limit; i++) {
                // per ogni passo, si effettua un cambio di peso
                var graph_struct = await graphModel.changeWeight(req.body.id, node_1, node_2, tmp).catch(e => next(ErrEnum.InvalidNode));
                
                var border: string = node_1 + node_2;
                var route = new Graph(graph_struct);
                var resultObj: any = await route.path(start_node, goal_node, { cost: true });
                var full_obj: any = { path: resultObj.path, cost: resultObj.cost, edge: border, weight: tmp };
                result.push(full_obj);
                // alla prima iterazione il best sarà sicuramente il valore attuale
                if(tmp==start_weight) {
                    best = full_obj;
                    best_struct = graph_struct;
                }
                
                // si confronta il best con quello attuale
                if (full_obj.cost < best.cost) {
                    best = full_obj;
                    best_struct = graph_struct;
                }
          
                tmp += step;
            }

            let optPath: any = best.path;
            res.status(200).send({ Message: "Risultati della simulazione", Simulations: result, Message_best: "Configurazione migliore e percorso ottimo", "Best": best_struct, "Optimal Path": optPath });
            
            next();
        } catch (err) {
            next(ErrEnum.BadRequest);
        }
    }
}