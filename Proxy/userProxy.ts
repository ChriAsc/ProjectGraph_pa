import { User } from '../Models/user';
import { interfaceUser } from './interfaceUser';

export class UserProxy implements interfaceUser {

    private user: User = new User();

    public findByName = async (username: string)  => {
        try {
            let user = await this.user.findByName(username);
            return user;
        } catch (err) {
            console.log("Username non trovato!")
        }
    }

    public findByEmail = async (email: string) => {
        let usr = await this.user.findByEmail(email);
        return usr;
    }

    public getBudget = async (username: string) => {
        try {
            let budget = await this.user.getBudget(username);
            return budget;
        } catch (err) {
            console.log(err);
        }
    }

    public updateBudget = async (name: string, budget: number) => {
        try {
            let usr = await this.user.updateBudget(name, budget);
        } catch (err) {
            console.log(err);
        }
    }
}