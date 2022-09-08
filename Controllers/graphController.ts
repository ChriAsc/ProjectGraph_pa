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
            let total_cost: number = await graph.getCost(req.body.graph);
            //let new_usr: any = await user.addUser("mario_rossi", 1, "mario@rossi.com", 5.0);
            let budget: number = await user.getBudget(req.user.username);
            if(total_cost > budget) {
                res.sendStatus(401);
            } else {
                await graph.addGraphModel(req.user.username, req.body.graph)
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