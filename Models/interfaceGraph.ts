/**
 * Interfaccia di GraphModel utile ad imporre vincoli e ad avere maggiore controllo
 */
export interface interfaceGraph {
    addGraphModel(username: string, struct: any, version?: number): Promise<any>;
    getGraphModels(username: string, nr_nodes: number, nr_edges: number): Promise<any>;
    getGraphStruct(idModel: number): Promise<any>;
    deleteGraphModel(idModel: number, ...otherId: number[]): Promise<any>;
    getVersion(idModel: number): Promise<number>;
    changeWeight(idModel: number, firstNode: string, secondNode: string, new_weight: number): Promise<any>;
    getWeight(idModel: number, firstNode: string, secondNode: string): Promise<number>;
    getCost(struct: any): Promise<number>;
    getNrNodes(struct: any): Promise<number>;
    getNrEdges(struct: any): Promise<number>;
}