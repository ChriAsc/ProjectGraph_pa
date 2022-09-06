import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';

const sequelize = Singleton.getInstance().getConnection();

export const Graph = sequelize.define('Graph', {
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
})