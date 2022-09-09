import * as auth from '../Middleware/auth'
import { Execution } from '../Models/executions';
import { GraphModel } from '../Models/graph';
import { User } from '../Models/user';

const dotenv = require('dotenv');
const Graph = require('node-dijkstra');

dotenv.config();

export class graphController {

    public newGraphModel = async (req, res, next) => {
        const graphModel = new GraphModel();
        const userModel = new User();
        try {
            let total_cost: number = await graphModel.getCost(req.body.graph);
            //let new_usr: any = await user.addUser("mario_rossi", 1, "mario@rossi.com", 5.0);
            let budget: any = await userModel.getBudget(req.user.username).catch(err => { next(err)});
            if(total_cost > budget) {
                res.sendStatus(401);
            } else {
                await graphModel.addGraphModel(req.user.username, req.body.graph);
                let new_budget: number = budget - total_cost;
                await userModel.updateBudget(req.user.username, new_budget);
                res.send("Inserimento avvenuto con successo.");
                next();
            }
            
        } catch (err) {
            next(err);
        }
    }

    public execModel = async (req, res, next) => {
        const graphModel = new GraphModel();
        const userModel = new User();
        const execModel = new Execution();
        try{
            let graph_struct: any = await graphModel.getGraphStruct(req.body.id);
            let total_cost: number = await graphModel.getCost(graph_struct);
            let budget: any = await userModel.getBudget(req.user.username).catch(err => { next(err)});
            if(total_cost > budget) {
                res.sendStatus(401);
            } else {
                
                let graph_struct = req.body.graph;
                let start: string = req.body.start;
                let goal: string = req.body.goal;
                const route = new Graph(graph_struct);

                const start_time: number = new Date().getTime();
                let resultObj: any = await route.path(start, goal, { cost: true });
                let elapsed: number = new Date().getTime() - start_time;

                let weightCost: number = resultObj.cost;
                let optPath: any = resultObj.path;
                let result: string = await execModel.addExec(elapsed, req.body.id, start, goal, weightCost, optPath, total_cost);
                res.send(result);
            }
        } catch(err) {
            next(err);
        }
    }

    public changeEdgeWeight = async (req, res, next) => {
        const graphModel = new GraphModel();
        try {
            let node_1: any = req.body.first_node;
            let node_2: any = req.body.second_node;
            let proposedWeight: number = req.body.weight;
            let alpha: number = parseFloat(process.env.ALPHA as string);
            let actual_weight: number = await graphModel.getWeight(req.body.id, node_1, node_2);

            let newWeight: number = alpha*(actual_weight) + (1 - alpha)*(proposedWeight);            

            await graphModel.changeWeight(req.body.id, node_1, node_2, newWeight);
            res.send("Cambio peso dell'arco avvenuto con successo.");
        } catch(err) {
            next(err);
        }
    }

    public filterModels = async (req, res, next) => {
        const graphModel = new GraphModel();
        try {
            let nr_nodes: number = parseInt(req.params.nodes);
            let nr_edges: number = parseInt(req.params.edges);

            let filteredModels = await graphModel.getGraphModels(req.user.username, nr_nodes, nr_edges);
            res.send("Modelli disponibili: " + filteredModels);
        } catch (err) {
            next(err);
        }
    }

    public deleteModel = async (req, res, next) => {
        const graphModel = new GraphModel();
        try {
            let str: any = req.params.ids;
            const params = str.split('&');

            for(const x in params) {
                var actual_id: number = parseInt(params[x]);
                await graphModel.deleteGraphModel(actual_id);
            }
            res.send("Eliminazione avvenuta con successo.");
        } catch (err) {
            next(err);
        }
    }

    public executions = async (req, res, next) => {
        const execModel = new Execution();
        try {
        } catch (err) {
            next(err);
        }
    }

}