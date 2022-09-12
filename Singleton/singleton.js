"use strict";
exports.__esModule = true;
exports.Singleton = void 0;
var sequelize_1 = require("sequelize");
var dotenv = require('dotenv');
dotenv.config();
/**
 * La classe Singleton consente di avere una e una sola istanza per tutta l'esecuzione. Tale oggetto è utile
 * a istanziare la connessione al database scelto.
 */
var Singleton = /** @class */ (function () {
    /* Il costruttore del Singleton deve essere privato per evitare chiamate dirette */
    function Singleton() {
        var database = process.env.MYSQL_DATABASE;
        var username = process.env.MYSQL_USER;
        var password = process.env.MYSQL_PASSWORD;
        var host = process.env.MYSQL_HOST;
        var port = Number(process.env.MYSQL_PORT);
        this.connection = new sequelize_1.Sequelize(database, username, password, {
            host: host,
            port: port,
            dialect: 'mysql'
        });
    }
    /* Il metodo statico controlla l'accesso all'istanza di un oggetto in modo che questa sia unica */
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    /* Utile a restituire la connessione corrente */
    Singleton.prototype.getConnection = function () {
        return this.connection;
    };
    return Singleton;
}());
exports.Singleton = Singleton;
