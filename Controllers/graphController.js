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
            var graphModel, userModel, total_cost, budget, new_model, new_budget, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        userModel = new user_1.User();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, graphModel.getCost(req.body.graph)];
                    case 2:
                        total_cost = _a.sent();
                        return [4 /*yield*/, userModel.getBudget(req.user.username)];
                    case 3:
                        budget = _a.sent();
                        if (!(total_cost > budget)) return [3 /*break*/, 4];
                        next(errorFactory_1.ErrEnum.Unauthorized);
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, graphModel.addGraphModel(req.user.username, req.body.graph)];
                    case 5:
                        new_model = _a.sent();
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
            var graphModel, userModel, execModel, graph_struct, total_cost, budget, start, goal, route, start_time, resultObj, elapsed, weightCost, optPath, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        userModel = new user_1.User();
                        execModel = new executions_1.Execution();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
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
                        return [3 /*break*/, 8];
                    case 5:
                        start = req.body.start;
                        goal = req.body.goal;
                        route = new Graph(graph_struct);
                        start_time = new Date().getTime();
                        return [4 /*yield*/, route.path(start, goal, { cost: true })];
                    case 6:
                        resultObj = _a.sent();
                        elapsed = new Date().getTime() - start_time;
                        weightCost = resultObj.cost;
                        optPath = resultObj.path;
                        return [4 /*yield*/, execModel.addExec(elapsed, req.body.id, start, goal, weightCost, optPath, total_cost)];
                    case 7:
                        result = _a.sent();
                        res.status(200).send(result);
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_2 = _a.sent();
                        next(errorFactory_1.ErrEnum.BadRequest);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che consente di gestire la richiesta di cambio peso da parte di un utente autenticato */
        this.changeEdgeWeight = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, alpha, node_1, node_2, proposedWeight, actual_weight, newWeight, newGraph, _a, _b, old_version, err_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        alpha = __1.ALPHA;
                        // si controlla il valore di alpha
                        if (alpha < 0 || alpha > 1)
                            alpha = 0.9;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        node_1 = req.body.first_node;
                        node_2 = req.body.second_node;
                        proposedWeight = req.body.weight;
                        return [4 /*yield*/, graphModel.getWeight(req.body.id, node_1, node_2)];
                    case 2:
                        actual_weight = _c.sent();
                        newWeight = alpha * (actual_weight) + (1 - alpha) * (proposedWeight);
                        _b = (_a = JSON).stringify;
                        return [4 /*yield*/, graphModel.changeWeight(req.body.id, node_1, node_2, newWeight)];
                    case 3:
                        newGraph = _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, graphModel.getVersion(req.body.id)];
                    case 4:
                        old_version = _c.sent();
                        // si aggiorna il modello, creandone uno nuovo ma con una versione differente
                        return [4 /*yield*/, graphModel.addGraphModel(req.user.username, newGraph, old_version + 1)];
                    case 5:
                        // si aggiorna il modello, creandone uno nuovo ma con una versione differente
                        _c.sent();
                        res.status(201).send("Cambio peso dell'arco avvenuto con successo.");
                        next();
                        return [3 /*break*/, 7];
                    case 6:
                        err_3 = _c.sent();
                        next(errorFactory_1.ErrEnum.BadRequest);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        /* Metodo che restituisce l'elenco dei modelli associati all'utente filtrati per numeri di nodi e numero di archi */
        this.filterModels = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var graphModel, nr_nodes, nr_edges, filteredModels, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graphModel = new graph_1.GraphModel();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        nr_nodes = parseInt(req.params.nodes);
                        nr_edges = parseInt(req.params.edges);
                        return [4 /*yield*/, graphModel.getGraphModels(req.user.username, nr_nodes, nr_edges)];
                    case 2:
                        filteredModels = _a.sent();
                        res.status(201).send("Modelli disponibili: " + filteredModels);
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        next(errorFactory_1.ErrEnum.Forbidden);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
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
            var graphModel, node_1, node_2, start_weight, stop_weight, step, start_node, goal_node, result, best, best_struct, i, graph_struct, route, resultObj, resultJson, err_7;
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
                        i = start_weight;
                        _a.label = 2;
                    case 2:
                        if (!(i <= stop_weight)) return [3 /*break*/, 6];
                        return [4 /*yield*/, graphModel.changeWeight(req.body.id, node_1, node_2, i)["catch"](function (e) { return next(errorFactory_1.ErrEnum.InvalidNode); })];
                    case 3:
                        graph_struct = _a.sent();
                        route = new Graph(graph_struct);
                        return [4 /*yield*/, route.path(start_node, goal_node, { cost: true })];
                    case 4:
                        resultObj = _a.sent();
                        // alla prima iterazione il best sarà sicuramente il valore attuale
                        if (i == start_weight) {
                            best = resultObj;
                            best_struct = graph_struct;
                        }
                        // si confronta il best con quello attuale
                        if (resultObj.cost < best.cost) {
                            best = resultObj;
                            best_struct = graph_struct;
                        }
                        resultJson = JSON.stringify(resultObj);
                        result.push(resultJson);
                        _a.label = 5;
                    case 5:
                        i + step;
                        return [3 /*break*/, 2];
                    case 6:
                        res.status(200).send("Risultati della simulazione\n" + result + "\nConfigurazione migliore e percorso ottimo: " + best_struct + "\n" + best);
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
