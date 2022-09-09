export interface interfaceGraph {
    addGraphModel(username: string, struct: any): Promise<any>;
    getGraphModels(username: string, nr_nodes: number, nr_edges: number): Promise<any>;
    deleteGraphModel(idModel: number, ...otherId: number[]): Promise<any>;
    changeWeight(idModel: number, firstNode: string, secondNode: string, new_weight: number): Promise<any>;
    getWeight(idModel: number, firstNode: string, secondNode: string): Promise<any>;
    getCost(struct: any): Promise<number>;
    getNrNodes(struct: any): Promise<number>;
    getNrEdges(struct: any): Promise<number>;
}