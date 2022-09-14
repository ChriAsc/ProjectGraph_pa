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
exports.ALPHA = void 0;
var auth_1 = require("./Middleware/auth");
var error_1 = require("./Middleware/error");
var graphController_1 = require("./Controllers/graphController");
var admin_1 = require("./Middleware/admin");
var userController_1 = require("./Controllers/userController");
var structure_1 = require("./Middleware/structure");
var bodyParser = require('body-parser');
var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var PORT = process.env.EXTERNAL_PORT || 8080;
var HOST = process.env.HOST || '0.0.0.0';
/* Il valore di alpha viene verificato nel controller */
exports.ALPHA = parseFloat(process.env.ALPHA);
var app = express();
var controllerGraphModel = new graphController_1.graphController();
var controllerUser = new userController_1.userController();
/* middleware utile per il parsing JSON */
app.use(bodyParser.json());
/* middleware utile per verificare il token JWT */
app.use([auth_1.checkHeader, auth_1.checkToken, auth_1.verifyAndAuthenticate]);
app.post('/addModel', [auth_1.checkUser, structure_1.checkStructure], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerGraphModel.newGraphModel(req, res, next);
    return [2 /*return*/];
}); }); });
app.post('/executeModel', auth_1.checkUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerGraphModel.execModel(req, res, next);
    return [2 /*return*/];
}); }); });
app.post('/changeWeight', auth_1.checkUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerGraphModel.changeEdgeWeight(req, res, next);
    return [2 /*return*/];
}); }); });
app.get('/models/:nodes/:edges', auth_1.checkUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerGraphModel.filterModels(req, res, next);
    return [2 /*return*/];
}); }); });
app.get('/delete/:ids', auth_1.checkUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerGraphModel.deleteModel(req, res, next);
    return [2 /*return*/];
}); }); });
app.get('/executions', auth_1.checkUser, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerGraphModel.getExecutions(req, res, next);
    return [2 /*return*/];
}); }); });
app.post('/simulation', [auth_1.checkUser, structure_1.checkWeight], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerGraphModel.startSimulation(req, res, next);
    return [2 /*return*/];
}); }); });
app.post('/recharge', [admin_1.checkAdmin, admin_1.checkEmail], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerUser.rechargeUser(req, res, next);
    return [2 /*return*/];
}); }); });
app.post('/addUser', admin_1.checkAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    controllerUser.createUser(req, res, next);
    return [2 /*return*/];
}); }); });
/* middleware di gestione dell'errore */
app.use(error_1.errorLogger);
app.use(error_1.errorHandler);
/*
app.listen(PORT, HOST,);
console.log(`Server in ascolto su http://${HOST}:${PORT}`);
*/
app.listen(PORT, HOST, function () { return console.log("Server in ascolto su http://".concat(HOST, ":").concat(PORT, "/")); });
