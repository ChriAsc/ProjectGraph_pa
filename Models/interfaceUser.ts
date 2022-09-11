/**
 * Interfaccia di User utile ad imporre vincoli e ad avere maggiore controllo
 */
export interface interfaceUser {
    findByName(username: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    getBudget(username: string): Promise<number>;
    updateBudget(username:string, budget: number): Promise<any>;
}