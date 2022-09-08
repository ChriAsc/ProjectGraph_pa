import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceGraph  } from '../Proxy/interfaceGraph';
import { User } from './user';

export class Graph implements interfaceGraph {

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

    
    public addGraphModel = async (username: string, struct: any, version: number) => {
        let model = await this.graph.create({ creator: username, graph_struct: struct, model_version: version });
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

    public getWeight = async (idModel: number, firstNode: string, secondNode: string) => {
        let graph: string = await this.graph.findAll({ attributes: ['graph_struct'], where: { model_id: idModel }});
        let objGraph: object = JSON.parse(graph);
        let edgeWeight: number = objGraph[firstNode][secondNode];
        return edgeWeight;
    }

    public associate = async () => {
        await this.user.hasMany(this.graph, { foreignKey: 'creator' });
        await this.graph.belongsTo(this.user, { foreignKey: 'creator' })
    }

}