import { ALPHA } from '..';
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
            let total_cost: number = await graphModel.getCost(req.body.graph);
            let budget: any = await userModel.getBudget(req.user.username);
            if(total_cost > budget) {
                next(ErrEnum.Unauthorized);
            } else {
                // se lo user ha credito sufficiente, si può procedere con la creazione
                let new_model: any = await graphModel.addGraphModel(req.user.username, req.body.graph);
                // si aggiorna il credito dell'utente
                let new_budget: number = budget - total_cost;
                await userModel.updateBudget(req.user.username, new_budget);
                res.status(201).send("Inserimento avvenuto con successo.");
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
                let result: string = await execModel.addExec(elapsed, req.body.id, start, goal, weightCost, optPath, total_cost);
                res.status(200).send(result);
            }
        } catch(err) {
            next(ErrEnum.BadRequest);
        }
    }

    /* Metodo che consente di gestire la richiesta di cambio peso da parte di un utente autenticato */
    public changeEdgeWeight = async (req, res, next) => {
        const graphModel = new GraphModel();
        let alpha: number = ALPHA;
            // si controlla il valore di alpha
            if(alpha < 0 || alpha > 1) alpha = 0.9;
        try {
            let node_1: any = req.body.first_node;
            let node_2: any = req.body.second_node;
            let proposedWeight: number = req.body.weight;
            let actual_weight: number = await graphModel.getWeight(req.body.id, node_1, node_2);    // peso prima della modifica

            let newWeight: number = alpha*(actual_weight) + (1 - alpha)*(proposedWeight);   // nuovo peso          

            // nuovo grafo
            let newGraph: any = JSON.stringify(await graphModel.changeWeight(req.body.id, node_1, node_2, newWeight));
            let old_version: number = await graphModel.getVersion(req.body.id); // si considera la versione del modello di provenienza
            // si aggiorna il modello, creandone uno nuovo ma con una versione differente
            await graphModel.addGraphModel(req.user.username, newGraph, old_version+1);
            res.status(201).send("Cambio peso dell'arco avvenuto con successo.");
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

            // si filtrano i modelli in base a chi richiede, al numero di nodi e al numero di archi
            let filteredModels = await graphModel.getGraphModels(req.user.username, nr_nodes, nr_edges);
            res.status(201).send("Modelli disponibili: " + filteredModels);
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
                // si considera un modello per volta in base all'id
                var actual_id: number = parseInt(params[x]);
                if(await graphModel.getCreator(actual_id) == req.user.username) {
                    await graphModel.deleteGraphModel(actual_id);
                    console.log("Eliminazione del modello " + actual_id + " avvenuta!" )
                } else {
                    next(ErrEnum.Unauthorized);
                }
            }

            res.status(201).send("Eliminazione completata con successo.");
            next();
        } catch (err) {
            next(ErrEnum.Forbidden);
        }
    }

    /* Metodo che restituisce l'elenco delle esecuzioni */
    public getExecutions = async (req, res, next) => {
        const execModel = new Execution();
        try {
            let raw: any = await execModel.getAllExec();
            let executions: any = JSON.stringify(raw);
            // si ottengono tutte le esecuzioni sottoforma di JSON
            res.status(201).send("Esecuzioni:\n" + executions);
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
            let node_1: string = req.body.fNode;                // estremo dell'arco da cambiare
            let node_2: string = req.body.sNode;                // l'altro estremo dell'arco da cambiare
            let start_weight: number = req.body.startWeight;    // peso iniziale
            let stop_weight: number = req.body.stopWeight;      // peso finale
            let step: number = req.body.step;                   // passo
            let start_node: string = req.body.startNode;        // nodo di partenza
            let goal_node: string = req.body.goalNode;          // nodo di arrivo
            let result: string[] = [];
            let best: any;
            let best_struct: any;

            for(let i = start_weight; i <= stop_weight; i+step) {
                // per ogni passo, si effettua un cambio di peso
                var graph_struct = await graphModel.changeWeight(req.body.id, node_1, node_2, i).catch(e => next(ErrEnum.InvalidNode));
                var route = new Graph(graph_struct);
                var resultObj: any = await route.path(start_node, goal_node, { cost: true });

                // alla prima iterazione il best sarà sicuramente il valore attuale
                if(i==start_weight) {
                    best = resultObj;
                    best_struct = graph_struct;
                }

                // si confronta il best con quello attuale
                if (resultObj.cost < best.cost) {
                    best = resultObj;
                    best_struct = graph_struct;
                }
                // per ogni iterazione si aggiunge il risultato sottoforma di JSON
                var resultJson = JSON.stringify(resultObj);
                result.push(resultJson);
            }

            res.status(200).send("Risultati della simulazione\n" + result + "\nConfigurazione migliore e percorso ottimo: " + best_struct + "\n" + best);
            
            next();
        } catch (err) {
            next(ErrEnum.BadRequest);
        }
    }
}