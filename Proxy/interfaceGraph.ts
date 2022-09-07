export interface interfaceGraph {
    addGraphModel(creator: string, struct: JSON, version: number): Promise<any>;
    getGraphModels(creator: string): Promise<any>;
    deleteGraphModel(idModel: number, ...otherId: number[]): Promise<any>;
    changeWeight(idModel: number, firstNode: string, secondNode: string, new_weight: number): Promise<any>;
}