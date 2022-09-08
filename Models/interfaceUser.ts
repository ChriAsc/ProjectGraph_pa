export interface interfaceUser {
    findByName(username: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    getBudget(username: string): Promise<any>;
    updateBudget(username:string, budget: number): Promise<any>;
}