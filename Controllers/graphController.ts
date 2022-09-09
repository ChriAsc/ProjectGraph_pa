import * as auth from '../Middleware/auth'
import { GraphModel } from '../Models/graph';
import { User } from '../Models/user';

const dotenv = require('dotenv');
const Graph = require('node-dijkstra');

dotenv.config();

export class graphController {

    public newGraphModel = async (req, res, next) => {
        const graph = new GraphModel();
        const user = new User();
        try {
            let total_cost: number = await graph.getCost(req.body.graph);
            //let new_usr: any = await user.addUser("mario_rossi", 1, "mario@rossi.com", 5.0);
            let budget: any = await user.getBudget(req.user.username).catch(err => { next(err)});
            if(total_cost > budget) {
                res.sendStatus(401);
            } else {
                await graph.addGraphModel(req.user.username, req.body.graph);
                let new_budget: number = budget - total_cost;
                await user.updateBudget(req.user.username, new_budget);
                res.send("Inserimento avvenuto con successo.");
                next();
            }
            
        } catch (err) {
            next(err);
        }
    }

    public changeEdgeWeight = async (req, res, next) => {
        const graph = new GraphModel();
        try {
            let node_1: any = req.body.first_node;
            let node_2: any = req.body.second_node;
            let proposedWeight: number = req.body.weight;
            let alpha: number = parseFloat(process.env.ALPHA as string);
            let actual_weight: number = await graph.getWeight(req.body.id, node_1, node_2);

            let newWeight: number = alpha*(actual_weight) + (1 - alpha)*(proposedWeight);            

            await graph.changeWeight(req.body.id, node_1, node_2, newWeight);
            res.send("Cambio peso dell'arco avvenuto con successo.");
        } catch(err) {
            next(err);
        }
    }

    public filterModels = async (req, res, next) => {
        const graph = new GraphModel();
        try {
            let nr_nodes: number = parseInt(req.params.nodes);
            let nr_edges: number = parseInt(req.params.edges);

            let filteredModels = await graph.getGraphModels(req.user.username, nr_nodes, nr_edges);
            res.send("Modelli disponibili: " + filteredModels);
        } catch (err) {
            next(err);
        }
    }

    public deleteModel = async (req, res, next) => {
        const graph = new GraphModel();
        try {
            let str: any = req.params.ids;
            const params = str.split('&');

            for(const x in params) {
                var actual_id: number = parseInt(params[x]);
                await graph.deleteGraphModel(actual_id);
            }
            res.send("Eliminazione avvenuta con successo.");
        } catch (err) {
            next(err);
        }
    }

}