import { DataTypes } from 'sequelize';
import { Singleton } from '../Singleton/singleton';
import { interfaceProxy } from '../Proxy/interfaceProxy'

export class User implements interfaceProxy {
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

    public addNew = async () => {
        
    }
    
    public find = async (name: string) => {
        let usr = await this.user.findAll({ where: { username: name } });
        return usr;
    }

    public getBudget = async (name: string) => {
        try {
            let budget = await this.user.findAll({ attributes: ['budget'], where: { username: name}});
            return budget;
        } catch (err) {
            console.log(err);
        }
    }
    
}