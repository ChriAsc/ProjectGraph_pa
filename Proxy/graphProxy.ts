import { Graph } from '../Models/graph';
import { interfaceGraph } from './interfaceGraph';

export class GraphProxy implements interfaceGraph {

    private graphModel: Graph = new Graph();

    public addGraphModel = async (username: string, struct: any, version: number) => {
        try {
            let graph = await this.graphModel.addGraphModel(username, struct, version);
            return graph;
        } catch (err) {
            console.log('Impossibile inserire un nuovo modello!')
        }
    }

    public getGraphModels = async (username: string) => {
        try {
            let models = await this.graphModel.getGraphModels(username);
            return models;
        } catch (err) {
            console.log('Impossibile trovare modelli associati all\'utente: ' + username);
        }
    }

    public deleteGraphModel = async (idModel: number, ...otherId: number[]) => {
        try {
            await this.graphModel.deleteGraphModel(idModel, ...otherId);
        } catch (err) {
            console.log('Impossibile eliminare il modello')
        }
    }

    public changeWeight = async (idModel: number, firstNode: string, secondNode: string, new_weight: number) => {
        try {
            if (!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) {
                throw new SyntaxError('I nodi inseriti non sono di tipo stringa!')
            } else if (!(this.assertType(new_weight, Number))) {
                throw new SyntaxError('Il peso inserito non è un numero!')
            } else {
                await this.graphModel.changeWeight(idModel, firstNode, secondNode, new_weight);
            }
        } catch (err) {
            console.log('Impossibile cambiare il peso associato a questo arco!')
        }
    }

    public getWeight = async (idModel: number, firstNode: string, secondNode: string) => {
        try {
            if (!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) {
                console.log('I nodi inseriti non sono di tipo stringa!')
            } else {
                await this.graphModel.getWeight(idModel, firstNode, secondNode);
            }
        } catch (err) {
            console.log('Impossibile ottenere il peso associato a questo arco!')
        }
    }

    public associate = async () => {
        await this.graphModel.associate();
    }

    public assertType (obj: any, type: any): boolean {
        return obj.constructor.name === type.name;
    }
}