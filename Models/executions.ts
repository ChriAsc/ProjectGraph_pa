import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceExec } from './interfaceExec';

/**
 * Classe che rappresenta la tabella executions nel db, accedendo ad un'unica istanza grazie al Singleton
 */
export class Execution implements interfaceExec {
    
    private execution: any;

    constructor() {

        const sequelize = Singleton.getInstance().getConnection();

        this.execution = sequelize.define('Execution', {
            exec_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            exec_time: {
                type: DataTypes.TIME,
                allowNull: false
            },
            model: {
                type: DataTypes.INTEGER,
                allowNull: false
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
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            },
            exec_cost: {
                type: DataTypes.DECIMAL,
                allowNull: false
            }
        }, {
            tableName: 'executions',
            timestamps: false
        })

    }
    
    /* Metodo necessario per creare una nuova esecuzione, specificando il tempo di esecuzione, l'id del modello
    associato, il nordo di partenza, il nodo di arrivo, il costo (in termini di peso) del percorso,
    il percorso e il costo (in termini di credito) dell'esecuzione */
    public addExec = async (ex_time: number, idModel: number, start: string, goal: string, pathCost: number, path: any, total_cost: number) => {
        await this.execution.create({ exec_time: ex_time, model: idModel, start_node: start, goal_node: goal, cost_path: pathCost, opt_path: path, exec_cost: total_cost });
        let obj = {Optimal_path: path, Start_node: start, Goal_node: goal, Path_cost: pathCost, Execution_time: ex_time, Execution_cost: total_cost};
        
        return obj;
    }

    /* Metodo utile ad ottenere tutte le esecuzioni */
    public getAllExec = async () => {
        let model: any = await this.execution.findAll({raw: true});
        let execs = await model.map(e => e = { exec_id: e.exec_id, exec_time: e.exec_time, exec_cost: e.exec_cost, model: e.model, cost_path: e.cost_path, start_node: e.start_node, goal_node: e.goal_node });
        return execs;
    }

}