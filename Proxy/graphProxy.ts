import { Graph } from "../Models/graph";
import { interfaceGraph } from "./interfaceGraph";

export class GraphProxy implements interfaceGraph {

    private graphModel: Graph = new Graph();

    public addGraphModel = async (creator: string, struct: JSON, version: number) => {
        try {
            let graph = await this.graphModel.addGraphModel(creator, struct, version);
            return graph;
        } catch (err) {
            console.log("Impossibile inserire un nuovo modello!")
        }
    }

    public getGraphModels = async (creator: string) => {
        try {
            let graphs = await this.graphModel.getGraphModels(creator);
            return graphs;
        } catch (err) {
            console.log("Impossibile trovare modelli associati all'utente: " + creator);
        }
    }

    public deleteGraphModel = async (idModel: number, ...otherId: number[]) => {
        try {
            await this.graphModel.deleteGraphModel(idModel, ...otherId);
        } catch (err) {
            console.log("Impossibile eliminare il modello")
        }
    }

    public changeWeight = async (idModel: number, firstNode: string, secondNode: string, new_weight: number) => {
    }

    
    public checkGraphModel = async () => {
    }
    
}