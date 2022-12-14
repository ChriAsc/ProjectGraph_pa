import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceUser } from './interfaceUser'

/**
 * Classe che rappresenta la tabella users nel db, accedendo ad un'unica istanza grazie al Singleton
 */
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
    
    /* Metodo utile per creare un nuovo utente */
    public addUser = async (username: string, email: string, budget: number) => {
        let modelUsr = await this.user.create({ username: username, main_role: 1, mail: email, budget: budget });
        return modelUsr;
    }

    /* Metodo utile a trovare un particolare user in base al nome passato come argomento */
    public findByName = async (name: string) => {
        let usr = await this.user.findOne({ where: { username: name } });
        return usr;
    }

    /* Metodo utile a trovare un particolare user in base all'email passata come argomento */
    public findByEmail = async (email: string) => {
        let usr = await this.user.findOne({ where: { mail: email } });
        return usr;
    }

    /* Metodo utile ad ottenere il credito dell'utente, identificato grazie al nome passato come argomento */
    public getBudget = async (name: string) => {
        let usr: any = await this.findByName(name);
        let credit: number = parseFloat(usr.budget);
        return credit;
    }

    /* Metodo necessario per aggiornare il credito dell'utente, passando anche il nuovo credito */
    public updateBudget = async (name: string, credit: number) => {
        let new_budget = await this.user.update({ budget: credit }, { where: { username: name} });
        return new_budget;
    }

}