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
    
    /*
    public addUser = async (username: string, role: number, email: string, budget: number) => {
        let modelUsr = await this.user.create({ username: username, main_role: role, mail: email, budget: budget });
        return modelUsr;
    }
    */
    public findByName = async (name: string) => {
        let usr = await this.user.findOne({ where: { username: name } });
        return usr;
    }

    public findByEmail = async (email: string) => {
        let usr = await this.user.findOne({ where: { mail: email } });
        return usr;
    }

    public getBudget = async (name: string) => {
        let budget: number = await this.user.findOne({ attributes: ['budget'], where: { username: name}});
        return budget;
    }

    public updateBudget = async (name: string, budget: number) => {
        await this.user.update({ budget: budget }, { where: { username: name} });
    }
    
    public assertType (obj: any, type: any): boolean {
        return obj.constructor.name === type.name;
    }

}