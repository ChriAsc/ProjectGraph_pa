import { User } from '../Models/user';
import { interfaceProxy } from './interfaceProxy';

export class UserProxy implements interfaceProxy {

    private user: User;

    public addNew = async () => {
        throw new Error('Method not implemented.');
    }
    
    public find = async (name: string) => {
        try {
            let user = await this.user.find(name);
            return user;
        } catch (err) {
            console.log("Username non trovato!")
        }
    }

    public getBudget = async (name: string) => {
        try {
            let budget = await this.user.getBudget(name);
            return budget;
        } catch (err) {
            console.log(err);
        }
    }
}