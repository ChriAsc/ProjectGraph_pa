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
exports.GraphModel = void 0;
var sequelize_1 = require("sequelize");
var singleton_1 = require("../Singleton/singleton");
/**
 * Classe che rappresenta la tabella graphmodels nel db, accedendo ad un'unica istanza grazie al Singleton
 */
var GraphModel = /** @class */ (function () {
    function GraphModel() {
        var _this = this;
        /* Metodo necessario per creare un nuovo modello, specificando lo username, il grafo ed eventualmente la versione (di default 1) */
        this.addGraphModel = function (username, objGraph, version) { return __awaiter(_this, void 0, void 0, function () {
            var jsonGraph, model, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonGraph = JSON.stringify(objGraph);
                        if (!((typeof version) === "number")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.graph.create({ creator: username, graph_struct: jsonGraph, model_version: version })];
                    case 1:
                        model = _a.sent();
                        return [2 /*return*/, model];
                    case 2: return [4 /*yield*/, this.graph.create({ creator: username, graph_struct: jsonGraph })];
                    case 3:
                        model = _a.sent();
                        return [2 /*return*/, model];
                }
            });
        }); };
        /* Metodo utile ad ottenere i modelli associati all'utente, specificando anche il numero di nodi e di archi */
        this.getGraphModels = function (username, nr_nodes, nr_edges) { return __awaiter(_this, void 0, void 0, function () {
            var graphs, filteredGraphs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graph.findAll({ attributes: ['graph_struct'], where: { creator: username } })];
                    case 1:
                        graphs = _a.sent();
                        return [4 /*yield*/, graphs.filter(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.getNrNodes(element)];
                                        case 1:
                                            _a = (_b.sent()) === nr_nodes;
                                            if (!_a) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.getNrEdges(element)];
                                        case 2:
                                            _a = (_b.sent()) === nr_edges;
                                            _b.label = 3;
                                        case 3:
                                            (_a);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .map(function (item) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.graph.findAll({ where: { graph_struct: item } })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            }); }); })];
                    case 2:
                        filteredGraphs = _a.sent();
                        return [2 /*return*/, filteredGraphs];
                }
            });
        }); };
        /* Metodo utile ad ottenere il grafo di un particolare modello, cercandolo tramite l'id */
        this.getGraphStruct = function (idModel) { return __awaiter(_this, void 0, void 0, function () {
            var graphStruct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graph.findOne({ attributes: ['graph_struct'], where: { modelId: idModel } })];
                    case 1:
                        graphStruct = _a.sent();
                        return [2 /*return*/, JSON.parse(graphStruct)];
                }
            });
        }); };
        /* Metodo utile ad eliminare un particolare modello, specificando l'id corrispondente */
        this.deleteGraphModel = function (idModel) { return __awaiter(_this, void 0, void 0, function () {
            var todelete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graph.findOne({ where: { model_id: idModel } })];
                    case 1:
                        todelete = _a.sent();
                        return [4 /*yield*/, todelete.destroy()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /* Metodo necessario per conoscere la versione del modello indicato dall'id */
        this.getVersion = function (idModel) { return __awaiter(_this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graph.findOne({ attributes: ['model_version'], where: { model_id: idModel } })];
                    case 1:
                        v = _a.sent();
                        return [2 /*return*/, v];
                }
            });
        }); };
        /* Metodo utile a cambiare il peso di un particolare arco, specificando l'id, entrambi gli estremi e il nuovo peso da assegnare, ritornando il nuovo grafo */
        this.changeWeight = function (idModel, firstNode, secondNode, new_weight) { return __awaiter(_this, void 0, void 0, function () {
            var graph, objGraph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) return [3 /*break*/, 1];
                        throw new TypeError('I nodi inseriti non sono di tipo stringa!');
                    case 1: return [4 /*yield*/, this.graph.findOne({ attributes: ['graph_struct'], where: { model_id: idModel } })];
                    case 2:
                        graph = _a.sent();
                        objGraph = JSON.parse(graph);
                        // è più facile accedere ai valori e controllare se l'arco esiste
                        if (objGraph[firstNode][secondNode] === undefined)
                            throw new RangeError("L\'arco " + firstNode + secondNode + " non esiste!");
                        else {
                            objGraph[firstNode][secondNode] = new_weight;
                            /*
                            if(objGraph[secondNode][firstNode] !== undefined) {
                                // se esiste anche l'arco inverso, viene cambiato anche il suo peso (non necessariamente)
                                objGraph[secondNode][firstNode] = new_weight;
                            }
                            */
                            return [2 /*return*/, objGraph];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo utile ad ottenere il peso di un arco di un certo modello, specificando id del modello e i due estremi */
        this.getWeight = function (idModel, firstNode, secondNode) { return __awaiter(_this, void 0, void 0, function () {
            var graph, objGraph, edgeWeight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!(this.assertType(firstNode, String) && this.assertType(secondNode, String))) return [3 /*break*/, 1];
                        throw new TypeError('I nodi inseriti non sono di tipo stringa!');
                    case 1: return [4 /*yield*/, this.graph.findOne({ attributes: ['graph_struct'], where: { model_id: idModel } })];
                    case 2:
                        graph = _a.sent();
                        objGraph = JSON.parse(graph);
                        // è più facile accedere ai valori e controllare se l'arco esiste
                        if (objGraph[firstNode][secondNode] === undefined)
                            throw new RangeError("L\'arco " + firstNode + secondNode + " non esiste!");
                        else {
                            edgeWeight = objGraph[firstNode][secondNode];
                            return [2 /*return*/, edgeWeight];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo utile ad ottenere il costo(in termini di credito) del grafo passato come argomento */
        this.getCost = function (objGraph) { return __awaiter(_this, void 0, void 0, function () {
            var total_cost, node_cost, edge_cost, node_number, edge_number;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        total_cost = 0.0;
                        node_cost = 0.25;
                        edge_cost = 0.01;
                        return [4 /*yield*/, this.getNrNodes(objGraph)];
                    case 1:
                        node_number = _a.sent();
                        return [4 /*yield*/, this.getNrEdges(objGraph)];
                    case 2:
                        edge_number = _a.sent();
                        // calcolo del costo totale in base ai valori settati
                        total_cost = (node_number * node_cost) + (edge_number * edge_cost);
                        return [2 /*return*/, total_cost];
                }
            });
        }); };
        /* Metodo necessario per conoscere il numero di nodi di un grafo */
        this.getNrNodes = function (objGraph) { return __awaiter(_this, void 0, void 0, function () {
            var node_number;
            return __generator(this, function (_a) {
                node_number = Object.keys(objGraph).length;
                return [2 /*return*/, node_number];
            });
        }); };
        /* Metodo necessario per conoscere il numero di archi di un grafo */
        this.getNrEdges = function (objGraph) { return __awaiter(_this, void 0, void 0, function () {
            var edges, x, actual_node, edge_number;
            return __generator(this, function (_a) {
                edges = 0;
                for (x in objGraph) {
                    actual_node = objGraph[x];
                    edge_number = Object.keys(actual_node).length;
                    edges += edge_number;
                }
                return [2 /*return*/, edges];
            });
        }); };
        this.getCreator = function (idModel) { return __awaiter(_this, void 0, void 0, function () {
            var username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graph.findOne({ attributes: ['creator'], where: { modelId: idModel } })];
                    case 1:
                        username = _a.sent();
                        return [2 /*return*/, username];
                }
            });
        }); };
        var sequelize = singleton_1.Singleton.getInstance().getConnection();
        this.graph = sequelize.define('Graph', {
            model_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            creator: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            graph_struct: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: false
            },
            model_version: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            tableName: 'graphmodels',
            timestamps: false
        });
    }
    /* Metodo necessario per capire senza ambiguità se due oggetti sono dello stesso tipo */
    GraphModel.prototype.assertType = function (obj, type) {
        return obj.constructor.name === type.name;
    };
    return GraphModel;
}());
exports.GraphModel = GraphModel;
