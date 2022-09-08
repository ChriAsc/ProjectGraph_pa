import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { Graph } from './graph';

export class Execution {
    
    private execution: any;
    private graph: any;

    constructor() {

        const sequelize = Singleton.getInstance().getConnection();

        this.graph = new Graph();

        this.execution = sequelize.define('Execution', {
            exec_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            start_time: {
                type: DataTypes.TIME,
                allowNull: false
            },
            stop_time: {
                type: DataTypes.TIME,
                allowNull: false
            },
            model: {
                type: DataTypes.INTEGER,
                references: {
                    model: this.graph,
                    key: 'model_id'
                }
            },
            start_node: {
                type: DataTypes.STRING,
                allowNull: false
            },
            goal_node: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cost_path: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            opt_path: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: 'executions',
            timestamps: false
        })

    }
}