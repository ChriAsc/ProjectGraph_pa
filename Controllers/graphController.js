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
exports.graphController = void 0;
var __1 = require("..");
var errorFactory_1 = require("../Factory/errorFactory");
var executions_1 = require("../Models/executions");
var graph_1 = require("../Models/graph");
var user_1 = require("../Models/user");
var dotenv = require('dotenv');
var Graph = require('node-dijkstra');
dotenv.config();
/**
 * Classe che implementa il controller del modello
**/
var graphController = /** @class */ (function () {
    function graphController() {
        var _this = this;
        /* Metodo che consente di inserire un nuovo modello */
        this.newGraphModel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, userModel, total_cost, budget, new_budget, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        userModel = new user_1.User();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, graphModel.getCost(req.body)];
                    case 2:
                        total_cost = _a.sent();
                        return [4 /*yield*/, userModel.getBudget(req.user.username)];
                    case 3:
                        budget = _a.sent();
                        if (!(total_cost > budget)) return [3 /*break*/, 4];
                        next(errorFactory_1.ErrEnum.Unauthorized);
                        return [3 /*break*/, 7];
                    case 4: 
                    // se lo user ha credito sufficiente, si può procedere con la creazione
                    return [4 /*yield*/, graphModel.addGraphModel(req.user.username, req.body)];
                    case 5:
                        // se lo user ha credito sufficiente, si può procedere con la creazione
                        _a.sent();
                        new_budget = budget - total_cost;
                        return [4 /*yield*/, userModel.updateBudget(req.user.username, new_budget)];
                    case 6:
                        _a.sent();
                        res.status(201).send("Inserimento avvenuto con successo.");
                        _a.label = 7;
                    case 7:
                        next();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        next(errorFactory_1.ErrEnum.BadRequest);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che consente di eseguire un modello da parte di un utente */
        this.execModel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, userModel, execModel, graph_struct, total_cost, budget, new_budget, start, goal, route, start_time, resultObj, elapsed, weightCost, optPath, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        userModel = new user_1.User();
                        execModel = new executions_1.Execution();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, graphModel.getGraphStruct(req.body.id)];
                    case 2:
                        graph_struct = _a.sent();
                        return [4 /*yield*/, graphModel.getCost(graph_struct)];
                    case 3:
                        total_cost = _a.sent();
                        return [4 /*yield*/, userModel.getBudget(req.user.username)];
                    case 4:
                        budget = _a.sent();
                        if (!(total_cost > budget)) return [3 /*break*/, 5];
                        next(errorFactory_1.ErrEnum.Unauthorized);
                        return [3 /*break*/, 9];
                    case 5:
                        new_budget = budget - total_cost;
                        return [4 /*yield*/, userModel.updateBudget(req.user.username, new_budget)];
                    case 6:
                        _a.sent();
                        start = req.body.start;
                        goal = req.body.goal;
                        route = new Graph(graph_struct);
                        start_time = new Date().getTime();
                        return [4 /*yield*/, route.path(start, goal, { cost: true })];
                    case 7:
                        resultObj = _a.sent();
                        elapsed = new Date().getTime() - start_time;
                        weightCost = resultObj.cost;
                        optPath = resultObj.path;
                        return [4 /*yield*/, execModel.addExec(elapsed, req.body.id, start, goal, weightCost, optPath, total_cost)];
                    case 8:
                        result = _a.sent();
                        res.status(200).send(result);
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_2 = _a.sent();
                        next(errorFactory_1.ErrEnum.BadRequest);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che consente di gestire la richiesta di cambio peso da parte di un utente autenticato */
        this.changeEdgeWeight = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, alpha, arr_length, i, actual_g, node_1, node_2, proposedWeight, id, actual_weight, newWeight, newGraph, old_version, new_version, foo, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        alpha = __1.ALPHA;
                        // si controlla il valore di alpha
                        if (alpha < 0 || alpha > 1)
                            alpha = 0.9;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        arr_length = req.body.graphs.length;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < arr_length)) return [3 /*break*/, 8];
                        actual_g = req.body.graphs[i];
                        // si controlla il valore del peso
                        if (typeof actual_g.weight !== "number")
                            next(errorFactory_1.ErrEnum.NaNWeight);
                        node_1 = actual_g.first_node;
                        node_2 = actual_g.second_node;
                        proposedWeight = actual_g.weight;
                        id = actual_g.id;
                        return [4 /*yield*/, graphModel.getWeight(id, node_1, node_2)];
                    case 3:
                        actual_weight = _a.sent();
                        newWeight = alpha * (actual_weight) + (1 - alpha) * (proposedWeight);
                        return [4 /*yield*/, graphModel.changeWeight(id, node_1, node_2, newWeight)];
                    case 4:
                        newGraph = _a.sent();
                        return [4 /*yield*/, graphModel.getVersion(id)];
                    case 5:
                        old_version = _a.sent();
                        new_version = old_version + 1;
                        return [4 /*yield*/, graphModel.addGraphModel(req.user.username, newGraph, new_version)];
                    case 6:
                        foo = _a.sent();
                        console.log("Cambio peso dell'arco " + node_1 + node_2 + " avvenuto con successo.");
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 2];
                    case 8:
                        res.status(201).send("Cambio peso avvenuto correttamente!");
                        next();
                        return [3 /*break*/, 10];
                    case 9:
                        err_3 = _a.sent();
                        next(errorFactory_1.ErrEnum.BadRequest);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che restituisce l'elenco dei modelli associati all'utente filtrati per numeri di nodi e numero di archi */
        this.filterModels = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, nr_nodes_1, nr_edges_1, models, filteredGraphs, result, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        nr_nodes_1 = parseInt(req.params.nodes);
                        nr_edges_1 = parseInt(req.params.edges);
                        return [4 /*yield*/, graphModel.getGraphModels(req.user.username)];
                    case 2:
                        models = _a.sent();
                        return [4 /*yield*/, models.filter(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, graphModel.getNrNodes(element.graph_struct)];
                                        case 1:
                                            _a = (_b.sent()) === nr_nodes_1;
                                            if (!_a) return [3 /*break*/, 3];
                                            return [4 /*yield*/, graphModel.getNrEdges(element.graph_struct)];
                                        case 2:
                                            _a = (_b.sent()) === nr_edges_1;
                                            _b.label = 3;
                                        case 3:
                                            (_a);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .map(function (e) { return e = { model_id: e.model_id, graph_struct: JSON.parse(e.graph_struct), model_version: e.model_version }; })];
                    case 3:
                        filteredGraphs = _a.sent();
                        result = JSON.stringify(filteredGraphs);
                        res.status(201).send("Modelli disponibili con " + nr_nodes_1 + " nodi e " + nr_edges_1 + " archi:\n" + result);
                        next();
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        next(errorFactory_1.ErrEnum.Forbidden);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che consente di cancellare uno o più modelli */
        this.deleteModel = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, str, params, _a, _b, _i, x, actual_id, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        str = req.params.ids;
                        params = str.split('&');
                        _a = [];
                        for (_b in params)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        x = _a[_i];
                        actual_id = parseInt(params[x]);
                        return [4 /*yield*/, graphModel.getCreator(actual_id)];
                    case 3:
                        if (!((_c.sent()) == req.user.username)) return [3 /*break*/, 5];
                        return [4 /*yield*/, graphModel.deleteGraphModel(actual_id)];
                    case 4:
                        _c.sent();
                        console.log("Eliminazione del modello " + actual_id + " avvenuta!");
                        return [3 /*break*/, 6];
                    case 5:
                        next(errorFactory_1.ErrEnum.Unauthorized);
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7:
                        res.status(201).send("Eliminazione completata con successo.");
                        next();
                        return [3 /*break*/, 9];
                    case 8:
                        err_5 = _c.sent();
                        next(errorFactory_1.ErrEnum.Forbidden);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che restituisce l'elenco delle esecuzioni */
        this.getExecutions = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var execModel, raw, executions, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        execModel = new executions_1.Execution();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, execModel.getAllExec()];
                    case 2:
                        raw = _a.sent();
                        executions = JSON.stringify(raw);
                        // si ottengono tutte le esecuzioni sottoforma di JSON
                        res.status(201).send("Esecuzioni:\n" + executions);
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        next(errorFactory_1.ErrEnum.Generic);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che consente di effettuare una simulazione */
        this.startSimulation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, node_1, node_2, start_weight, stop_weight, step, start_node, goal_node, result, best, best_struct, tmp, limit, i, graph_struct, border, route, resultObj, full_obj, resultJson, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        node_1 = req.body.fNode;
                        node_2 = req.body.sNode;
                        start_weight = req.body.startWeight;
                        stop_weight = req.body.stopWeight;
                        step = req.body.step;
                        start_node = req.body.startNode;
                        goal_node = req.body.goalNode;
                        result = [];
                        best = void 0;
                        best_struct = void 0;
                        tmp = start_weight;
                        limit = (stop_weight - start_weight) / step;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i <= limit)) return [3 /*break*/, 6];
                        return [4 /*yield*/, graphModel.changeWeight(req.body.id, node_1, node_2, tmp)["catch"](function (e) { return next(errorFactory_1.ErrEnum.InvalidNode); })];
                    case 3:
                        graph_struct = _a.sent();
                        border = node_1 + node_2;
                        route = new Graph(graph_struct);
                        return [4 /*yield*/, route.path(start_node, goal_node, { cost: true })];
                    case 4:
                        resultObj = _a.sent();
                        full_obj = { path: resultObj.path, cost: resultObj.cost, edge: border, weight: tmp };
                        result.push(full_obj);
                        // alla prima iterazione il best sarà sicuramente il valore attuale
                        if (tmp == start_weight) {
                            best = full_obj;
                            best_struct = graph_struct;
                        }
                        // si confronta il best con quello attuale
                        if (full_obj.cost < best.cost) {
                            best = full_obj;
                            best_struct = graph_struct;
                        }
                        // per ogni iterazione si aggiunge il risultato sottoforma di JSON
                        tmp += step;
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        resultJson = JSON.stringify(result);
                        res.status(200).send("Risultati della simulazione\n" + resultJson + "\n\nConfigurazione migliore e percorso ottimo: " + JSON.stringify(best_struct) + "\n" + JSON.stringify(best));
                        next();
                        return [3 /*break*/, 8];
                    case 7:
                        err_7 = _a.sent();
                        next(errorFactory_1.ErrEnum.BadRequest);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    return graphController;
}());
exports.graphController = graphController;
