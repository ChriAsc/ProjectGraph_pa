import { Sequelize } from 'sequelize';

const dotenv = require('dotenv');
dotenv.config();

/**
 * La classe Singleton consente di avere una e una sola istanza per tutta l'esecuzione. Tale oggetto è utile
 * a istanziare la connessione al database scelto.
 */
export class Singleton {
    private static instance: Singleton;
    private connection: Sequelize;

    // Il costruttore del Singleton deve essere privato per evitare chiamate dirette
    private constructor() {
        const database: string = <string> process.env.MYSQL_DATABASE;
        const username: string = <string> process.env.MYSQL_USER;
        const password: string = <string> process.env.MYSQL_PASSWORD;
        const host: string = <string> process.env.MYSQL_HOST;
        const port: number = Number(process.env.MYSQL_PORT);

        this.connection = new Sequelize(database, username, password, {
            host: host,
            port: port,
            dialect: 'mysql'
        });
    }

    // Il metodo statico controlla l'accesso all'istanza di un oggetto in modo che questa sia unica
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    // Utile a restituire la connessione corrente
    public getConnection(): Sequelize {
        return this.connection;
    }
}