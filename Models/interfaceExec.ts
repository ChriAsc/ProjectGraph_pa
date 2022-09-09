export interface interfaceExec {
    addExec(ex_time: number, idModel: number, start_node: string, goal_node: string, cost: number, path: any, total_cost: number): Promise<any>;
    getAllExec(): Promise<any>;
}