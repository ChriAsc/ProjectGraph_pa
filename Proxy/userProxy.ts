import { User } from '../Models/user';
import { interfaceUser } from './interfaceUser';

export class UserProxy implements interfaceUser {

    private user: User = new User();

    public findByName = async (username: string)  => {
        try {
            if (this.assertType(username, String)) {
                let usr = await this.user.findByName(username);
                return usr;
            } else throw new SyntaxError('Il valore inserito non è una stringa!')
        } catch (err) {
            console.log('Utente non trovato!')
        }
    }

    public findByEmail = async (email: string) => {
        try {
            if (this.assertType(email, String)) {
                let usr = await this.user.findByEmail(email);
                return usr;
        } else throw new SyntaxError('Il valore inserito non è una stringa!')
    } catch (err) {
        console.log('Utente non trovato!');
    }
}

    public getBudget = async (username: string) => {
        try {
            if (this.assertType(username, String)) {
                let budget = await this.user.getBudget(username);
                return budget;
            } else throw new SyntaxError('Il valore inserito non è una stringa!')
        } catch (err) {
            console.log(err);
        }
    }

    public updateBudget = async (username: string, budget: number) => {
        try {
            if (this.assertType(username, String)) {
                if (this.assertType(budget, Number)) {
                    await this.user.updateBudget(username, budget);
                } else throw new SyntaxError('Il valore inserito non è un numero!')
            } else throw new SyntaxError('Il valore inserito non è una stringa!')
        } catch (err) {
            console.log(err);
        }
    }

    public assertType (obj: any, type: any): boolean {
        return obj.constructor.name === type.name;
    }

}