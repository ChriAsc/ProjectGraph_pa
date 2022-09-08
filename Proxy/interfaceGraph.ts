export interface interfaceGraph {
    addGraphModel(username: string, struct: any, version: number): Promise<any>;
    getGraphModels(username: string): Promise<any>;
    deleteGraphModel(idModel: number, ...otherId: number[]): Promise<any>;
    changeWeight(idModel: number, firstNode: string, secondNode: string, new_weight: number): Promise<any>;
    getWeight(idModel: number, firstNode: string, secondNode: string): Promise<any>;
    associate(): Promise<any>;
}