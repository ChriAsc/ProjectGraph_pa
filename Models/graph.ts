import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceGraph  } from './interfaceGraph';
import { User } from './user';

export class GraphModel implements interfaceGraph {

    private graph: any;
    private user: any;

    constructor() {

        const sequelize = Singleton.getInstance().getConnection();

        this.user = new User();

        this.graph = sequelize.define('Graph', {
            model_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            creator: {
                type: DataTypes.STRING,
                references: {
                    model: this.user,
                    key: 'username'
                }
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

    
    public addGraphModel = async (username: string, struct: any) => {
        let model = await this.graph.create({ creator: username, graph_struct: struct });
        return model;
    }
    
    public getGraphModels = async (username: string) => {
        let models = await this.graph.findAll({ where: { creator: username } });
        return models;
    }

    public deleteGraphModel = async (idModel: number, ...otherId: number[]) => {
        await this.graph.findAll( { where: { model_id: idModel} } ).destroy();

        if (otherId.length != 0) {
            for(var val of otherId) {
                await this.graph.findAll( { where: { model_id: val } }).destroy();
            }
        }
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

                await this.graph.update({ graph_struct: jsonGraph, where: { model_id: idModel }});
            }
        }
    }

    public getWeight = async (idModel: number, firstNode: string, secondNode: string) => {
        if (!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) {
            console.log('I nodi inseriti non sono di tipo stringa!')
        } else {
        let graph: string = await this.graph.findAll({ attributes: ['graph_struct'], where: { model_id: idModel }});
        let objGraph: object = JSON.parse(graph);
        let edgeWeight: number = objGraph[firstNode][secondNode];
        return edgeWeight;
        }
    }

    public getCost = async (struct: any) => {
        let total_cost: number = 0.0;
        let node_cost: number = 0.25;
        let edge_cost = 0.01;

        let objGraph: object = JSON.parse(struct);
        var node_number: number = Object.keys(objGraph).length;
        total_cost += (node_number * node_cost);

        for (let i=0; i < node_number; i++ ) {
            let actual_node: object = objGraph[i];
            let edge_number: number = Object.keys(actual_node).length;
            total_cost += (edge_number * edge_cost);
        }
        return total_cost;
    }

    public checkCost = async (username: string, struct: any) => {
        let budget: number = await this.user.getBudget(username);
        let total_cost: number = await this.graph.getCost(struct);
        if(total_cost < budget) {
            return true;
        } else {
            return false;
        }
    }

    public associate = async () => {
        await this.user.hasMany(this.graph, { foreignKey: 'creator' });
        await this.graph.belongsTo(this.user, { foreignKey: 'creator' })
    }

    public assertType (obj: any, type: any): boolean {
        return obj.constructor.name === type.name;
    }

}