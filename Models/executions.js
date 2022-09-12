"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Execution = void 0;
var sequelize_1 = require("sequelize");
var singleton_1 = require("../Singleton/singleton");
/**
 * Classe che rappresenta la tabella executions nel db, accedendo ad un'unica istanza grazie al Singleton
 */
var Execution = /** @class */ (function () {
    function Execution() {
        var _this = this;
        /* Metodo necessario per creare una nuova esecuzione, specificando il tempo di esecuzione, l'id del modello
        associato, il nordo di partenza, il nodo di arrivo, il costo (in termini di peso) del percorso,
        il percorso e il costo (in termini di credito) dell'esecuzione */
        this.addExec = function (ex_time, idModel, start, goal, pathCost, path, total_cost) { return __awaiter(_this, void 0, void 0, function () {
            var obj, jsonExec;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execution.create({ exec_time: ex_time, model: idModel, start_node: start, goal_node: goal, cost_path: pathCost, opt_path: path, exec_cost: total_cost })];
                    case 1:
                        _a.sent();
                        obj = { Optimal_path: path, Start_node: start, Goal_node: goal, Path_cost: pathCost, Execution_time: ex_time, Execution_cost: total_cost };
                        jsonExec = JSON.stringify(obj);
                        // si restituisce l'esecuzione appena aggiunta in JSON
                        return [2 /*return*/, jsonExec];
                }
            });
        }); };
        /* Metodo utile ad ottenere tutte le esecuzioni */
        this.getAllExec = function () { return __awaiter(_this, void 0, void 0, function () {
            var execs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execution.findAll({ exclude: ['opt_path'] })];
                    case 1:
                        execs = _a.sent();
                        return [2 /*return*/, execs];
                }
            });
        }); };
        var sequelize = singleton_1.Singleton.getInstance().getConnection();
        this.execution = sequelize.define('Execution', {
            exec_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            exec_time: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            model: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            start_node: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            goal_node: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            cost_path: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false
            },
            opt_path: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
                allowNull: false
            },
            exec_cost: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false
            }
        }, {
            tableName: 'executions',
            timestamps: false
        });
    }
    return Execution;
}());
exports.Execution = Execution;
