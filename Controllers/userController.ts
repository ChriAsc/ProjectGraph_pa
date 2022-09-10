import { User } from "../Models/user";

const dotenv = require('dotenv');
const Graph = require('node-dijkstra');

dotenv.config();

export class userController {

    public rechargeUser = async (req, res, next) => {
        const Us: any = new User();
        try {
            let usr: any = await Us.findByEmail(req.user.mail);
            let old: number = await Us.getBudget(usr.username);
            let new_budget: number = old + parseFloat(req.user.budget);
            await usr.updateBudget(usr.username, new_budget);
            next();
        } catch (err) {
            next(err);
        }
    }
}