import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceGraph  } from './interfaceGraph';

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

    
    public addGraphModel = async (username: string, objGraph: any, version?: number) => {
        const jsonGraph = JSON.stringify(objGraph);
        if((typeof version) === "number") {
        let model = await this.graph.create({ creator: username, graph_struct: jsonGraph, model_version: version });
        return model;
        } else {
            let model = await this.graph.create({ creator: username, graph_struct: jsonGraph });
            return model;
        }
    }
    
    public getGraphModels = async (username: string, nr_nodes: number, nr_edges: number) => {
        
        let graphs: any = await this.graph.findAll({ attributes: ['graph_struct'], where: { creator: username } });
        let filteredGraphs: any = await graphs.filter(async (element) => {
            (await this.getNrNodes(element) === nr_nodes && await this.getNrEdges(element) === nr_edges)
        }).map(async (item) => {
            await this.graph.findAll({ where: { graph_struct: item}})
        });
        return filteredGraphs;
    }

    public getGraphStruct = async (idModel: number) => {
        let graphStruct: any = await this.graph.findAll({ attributes: ['graph_struct'], where: { modelId: idModel } });
        return graphStruct;
    }

    public deleteGraphModel = async (idModel: number) => {
        let todelete: any = await this.graph.findAll( { where: { model_id: idModel} } );
        await todelete.destroy();
        /*
        if (otherId.length != 0) {
            for(var val of otherId) {
                var to_delete: any = await this.graph.findAll( { where: { model_id: val } });
                await to_delete.destroy();
            }
        }
        */
    }

    public changeWeight = async (idModel: number, firstNode: string, secondNode: string, new_weight: number) => {
        if (!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) {
            throw new SyntaxError('I nodi inseriti non sono di tipo stringa!')
        } else if (!(this.assertType(new_weight, Number))) {
            throw new SyntaxError('Il peso inserito non è un numero!')
        } else {        
            let graph: string = await this.graph.findAll({ attributes: ['graph_struct'], where: { model_id: idModel }});
            let objGraph: object = JSON.parse(graph);

            if(objGraph[firstNode][secondNode] === undefined) throw new SyntaxError("L\'arco " + firstNode + secondNode + " non esiste!");
            else {
                objGraph[firstNode][secondNode] = new_weight;

                if(objGraph[firstNode][secondNode] !== undefined) {
                    objGraph[secondNode][firstNode] = new_weight;
                }

                let jsonGraph: string = JSON.stringify(objGraph);
                let username: string = this.graph.findAll({ attributes: ['creator'], where: { model_id: idModel }});
                let new_version: number = this.graph.findAll({ attributes: ['model_version'], where: { model_id: idModel }}) +1;
                await this.addGraphModel(username, jsonGraph, new_version);
            }
        }
    }

    public getWeight = async (idModel: number, firstNode: string, secondNode: string) => {
        if (!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) {
            throw new SyntaxError('I nodi inseriti non sono di tipo stringa!')
        } else {
        let graph: string = await this.graph.findAll({ attributes: ['graph_struct'], where: { model_id: idModel }});
        let objGraph: object = JSON.parse(graph);
        let edgeWeight: number = objGraph[firstNode][secondNode];
        return edgeWeight;
        }
    }

    public getCost = async (objGraph: any) => {
        let total_cost: number = 0.0;
        let node_cost: number = 0.25;
        let edge_cost = 0.01;

        var node_number: number = await this.getNrNodes(objGraph);
        var edge_number: number = await this.getNrEdges(objGraph);

        total_cost = (node_number * node_cost) + (edge_number * edge_cost);

        return total_cost;
    }

    public getNrNodes = async (objGraph: any) => {
        const node_number: number = Object.keys(objGraph).length;
        return node_number;
    }

    public getNrEdges = async (objGraph: any) => {
        let edges: number = 0;
        for (const x in objGraph) {
            let actual_node = objGraph[x];
            let edge_number: number = Object.keys(actual_node).length;
            edges += edge_number;
        }
        return edges;
    }

    public assertType (obj: any, type: any): boolean {
        return obj.constructor.name === type.name;
    }

}