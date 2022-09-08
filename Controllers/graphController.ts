import * as auth from '../Middleware/auth'
import { GraphModel } from '../Models/graph';
import { User } from '../Models/user';

const Graph = require('node-dijkstra');

const route = new Graph();

export class graphController {
    public newGraphModel = async (req, res, next) => {
        const graph = new GraphModel();
        const user = new User();
        try {
            let total_cost = await graph.getCost(req.body);
            var flag = await graph.checkCost(req.user.username, req.body);
            if(flag !== true) {
                res.sendStatus(401);
            } else {
                let model = await graph.addGraphModel(req.user.username, req.body)
                let old: number = await user.getBudget(req.user.username);
                let new_budget: number = old - total_cost;
                await user.updateBudget(req.user.username, new_budget);
                res.send("Inserimento avvenuto con successo");
            }
        } catch (err) {
            next(err);
        }
    }
}