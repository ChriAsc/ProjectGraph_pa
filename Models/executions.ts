import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';

const sequelize = Singleton.getInstance().getConnection();

export const Execution = sequelize.define('Execution', {
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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'executions',
    timestamps: false
})