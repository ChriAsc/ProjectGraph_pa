import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceUser } from './interfaceUser'

export class User implements interfaceUser {
    
    private user: any;

    constructor() {

        const sequelize = Singleton.getInstance().getConnection();

        this.user = sequelize.define('User', {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            main_role: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            budget: {
                type: DataTypes.DECIMAL,
                allowNull: false
            }
        }, {
            tableName: 'users',
            timestamps: false
        });
    }
    
    
    public findByName = async (name: string) => {
        let usr = await this.user.findAll({ where: { username: name } });
        return usr;
    }

    public findByEmail = async (email: string) => {
        let usr = await this.user.findAll({ where: { mail: email } });
        return usr;
    }

    public getBudget = async (name: string) => {
        let budget: number = await this.user.findAll({ attributes: ['budget'], where: { username: name}});
        return budget;
    }

    public updateBudget = async (name: string, budget: number) => {
        await this.user.update({ budget: budget }, { where: { username: name} });
    }
    
    public assertType (obj: any, type: any): boolean {
        return obj.constructor.name === type.name;
    }

}