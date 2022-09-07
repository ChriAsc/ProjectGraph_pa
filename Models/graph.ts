import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceGraph  } from '../Proxy/interfaceGraph';

export class Graph implements interfaceGraph {

    private graphModel:any;

    constructor() {

        const sequelize = Singleton.getInstance().getConnection();

        this.graphModel = sequelize.define('Graph', {
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

    
    public addGraphModel = async (creator: string, struct: JSON, version: number) => {
        let model = await this.graphModel.create({ creator: creator, graph_struct: struct, model_version: version });
        return model;
    }
    
    public getGraphModels = async (creator: string) => {
        let models = await this.graphModel.findAll({ where: { creator: creator } });
        return models;
    }

    public deleteGraphModel = async (idModel: number, ...otherId: number[]) => {
        await this.graphModel.findAll( { where: { model_id: idModel} } ).destroy();

        if (otherId.length != 0) {
            for(var val of otherId) {
                await this.graphModel.findAll( { where: { model_id: val } }).destroy();
            }
        }
    }

    public changeWeight = async (idModel: number, firstNode: string, secondNode: string, new_weight: number) => {
        let model = await this.graphModel.findAll( { where: { model_id: idModel } });

    }
    
}