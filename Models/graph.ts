import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceGraph  } from './interfaceGraph';

/**
 * Classe che rappresenta la tabella graphmodels nel db, accedendo ad un'unica istanza grazie al Singleton
 */
export class GraphModel implements interfaceGraph {

    private graph: any;

    constructor() {

        const sequelize = Singleton.getInstance().getConnection();

        this.graph = sequelize.define('Graph', {
            model_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            creator: {
                type: DataTypes.STRING,
                allowNull: false
            },
            graph_struct: {
                type: DataTypes.JSON,
                allowNull: false
            },
            model_version: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            tableName: 'graphmodels',
            timestamps: false
        });
    }

    /* Metodo necessario per creare un nuovo modello, specificando lo username, il grafo ed eventualmente la versione (di default 1) */
    public addGraphModel = async (username: string, objGraph: any, version?: number) => {
        const jsonGraph = JSON.stringify(objGraph);
        if((typeof version) === "number") {
            // se specificato, viene aggiunto anche il numero della versione al momento della creazione
            let model = await this.graph.create({ creator: username, graph_struct: jsonGraph, model_version: version });
            return model;
        } else {
            let model = await this.graph.create({ creator: username, graph_struct: jsonGraph });
            return model;
        }
    }
    
    /* Metodo utile ad ottenere i modelli associati all'utente, specificando anche il numero di nodi e di archi */
    public getGraphModels = async (username: string, nr_nodes: number, nr_edges: number) => {
        let graphs: any = await this.graph.findAll({ attributes: ['graph_struct'], where: { creator: username } });
        // si scelgono solamente i grafi che hanno il numero di nodi e di archi specificato
        let filteredGraphs: any = await graphs.filter(async (element) => {
            (await this.getNrNodes(element) === nr_nodes && await this.getNrEdges(element) === nr_edges) })
            .map(async (item) => { await this.graph.findAll({ where: { graph_struct: item } }) });
        return filteredGraphs;
    }

    /* Metodo utile ad ottenere il grafo di un particolare modello, cercandolo tramite l'id */
    public getGraphStruct = async (idModel: number) => {
        let graphStruct: any = await this.graph.findOne({ attributes: ['graph_struct'], where: { modelId: idModel } });
        return JSON.parse(graphStruct);
    }

    /* Metodo utile ad eliminare un particolare modello, specificando l'id corrispondente */
    public deleteGraphModel = async (idModel: number) => {
        let todelete: any = await this.graph.findOne( { where: { model_id: idModel} } );
        await todelete.destroy();
    }

    /* Metodo necessario per conoscere la versione del modello indicato dall'id */
    public getVersion = async (idModel: number) => {
        let v: number =  await this.graph.findOne({ attributes: ['model_version'], where: { model_id: idModel }});
        return v;
    }
    
    /* Metodo utile a cambiare il peso di un particolare arco, specificando l'id, entrambi gli estremi e il nuovo peso da assegnare, ritornando il nuovo grafo */
    public changeWeight = async (idModel: number, firstNode: string, secondNode: string, new_weight: number) => {
        // prima un check aggiuntivo sul tipo dei nodi
        if (!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) {
            throw new TypeError('I nodi inseriti non sono di tipo stringa!')
        } else {        
            let graph: any = await this.graph.findOne({ attributes: ['graph_struct'], where: { model_id: idModel }});
            let objGraph: object = JSON.parse(graph);
            // è più facile accedere ai valori e controllare se l'arco esiste
            if(objGraph[firstNode][secondNode] === undefined) throw new RangeError("L\'arco " + firstNode + secondNode + " non esiste!");
            else {
                objGraph[firstNode][secondNode] = new_weight;
                /*
                if(objGraph[secondNode][firstNode] !== undefined) {
                    // se esiste anche l'arco inverso, viene cambiato anche il suo peso (non necessariamente)
                    objGraph[secondNode][firstNode] = new_weight;
                }
                */
                return objGraph;
            }
        }
    }

    /* Metodo utile ad ottenere il peso di un arco di un certo modello, specificando id del modello e i due estremi */
    public getWeight = async (idModel: number, firstNode: string, secondNode: string) => {
        if (!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) {
            throw new TypeError('I nodi inseriti non sono di tipo stringa!')
        } else {
        let graph: string = await this.graph.findOne({ attributes: ['graph_struct'], where: { model_id: idModel }});
        let objGraph: object = JSON.parse(graph);
        // è più facile accedere ai valori e controllare se l'arco esiste
        if(objGraph[firstNode][secondNode] === undefined) throw new RangeError("L\'arco " + firstNode + secondNode + " non esiste!")
        else {
            let edgeWeight: number = objGraph[firstNode][secondNode];
            return edgeWeight;
            }
        }
    }

    /* Metodo utile ad ottenere il costo(in termini di credito) del grafo passato come argomento */
    public getCost = async (objGraph: any) => {
        let total_cost: number = 0.0;
        let node_cost: number = 0.25;
        let edge_cost = 0.01;

        var node_number: number = await this.getNrNodes(objGraph);  //numero di nodi
        var edge_number: number = await this.getNrEdges(objGraph);  // numero di archi

        // calcolo del costo totale in base ai valori settati
        total_cost = (node_number * node_cost) + (edge_number * edge_cost);

        return total_cost;
    }

    /* Metodo necessario per conoscere il numero di nodi di un grafo */
    public getNrNodes = async (objGraph: any) => {
        // i nodi sono identificati dalle chiavi "esterne"
        const node_number: number = Object.keys(objGraph).length;
        return node_number;
    }

    /* Metodo necessario per conoscere il numero di archi di un grafo */
    public getNrEdges = async (objGraph: any) => {
        let edges: number = 0;
        for (const x in objGraph) {
            let actual_node = objGraph[x];
            // gli archi sono identificati dalle chiavi "interne" (cioè il numero dei nodi vicini al nodo)
            let edge_number: number = Object.keys(actual_node).length;  
            edges += edge_number;
        }
        return edges;
    }

    public getCreator = async (idModel: number) => {
        let username: string = await this.graph.findOne({ attributes: ['creator'], where: { modelId: idModel } });
        return username;
    }

    /* Metodo necessario per capire senza ambiguità se due oggetti sono dello stesso tipo */
    public assertType (obj: any, type: any): boolean {
        return obj.constructor.name === type.name;
    }

}