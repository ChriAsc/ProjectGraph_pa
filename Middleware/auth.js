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
exports.checkUser = exports.verifyAndAuthenticate = exports.checkToken = exports.checkHeader = void 0;
var user_1 = require("../Models/user");
var errorFactory_1 = require("../Factory/errorFactory");
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();
/* Middleware necessario per controllare se è presente l'header */
var checkHeader = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    }
    else {
        var err = errorFactory_1.ErrEnum.MissingHeader;
        next(err);
    }
};
exports.checkHeader = checkHeader;
/* Middleware necessario per controllare che il token sia presente */
var checkToken = function (req, res, next) {
    try {
        var bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            var bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        }
    }
    catch (err) {
        next(errorFactory_1.ErrEnum.MissingToken);
    }
};
exports.checkToken = checkToken;
/* Middleware necessario per verificare e autenticare, controllando che il token sia valido */
var verifyAndAuthenticate = function (req, res, next) {
    try {
        var decodedPayload = jwt.verify(req.token, process.env.SECRET_KEY);
        if (decodedPayload !== null) {
            req.user = decodedPayload;
            next();
        }
    }
    catch (err) {
        next(errorFactory_1.ErrEnum.InvalidToken);
    }
};
exports.verifyAndAuthenticate = verifyAndAuthenticate;
/* Middleware necessario per verificare che la richiesta provenga da un utente esistente (ruolo 1) */
var checkUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err, usr, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(req.user.main_role !== 1)) return [3 /*break*/, 1];
                err = errorFactory_1.ErrEnum.Unauthorized;
                next(err);
                return [3 /*break*/, 3];
            case 1:
                usr = new user_1.User();
                return [4 /*yield*/, usr.findByName(req.user.username)];
            case 2:
                _a.sent();
                next();
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                next(errorFactory_1.ErrEnum.UserNotFound);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.checkUser = checkUser;
