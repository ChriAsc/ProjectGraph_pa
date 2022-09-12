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
exports.User = void 0;
var sequelize_1 = require("sequelize");
var singleton_1 = require("../Singleton/singleton");
/**
 * Classe che rappresenta la tabella users nel db, accedendo ad un'unica istanza grazie al Singleton
 */
var User = /** @class */ (function () {
    function User() {
        var _this = this;
        /*
        public addUser = async (username: string, role: number, email: string, budget: number) => {
            let modelUsr = await this.user.create({ username: username, main_role: role, mail: email, budget: budget });
            return modelUsr;
        }
        */
        /* Metodo utile a trovare un particolare user in base al nome passato come argomento */
        this.findByName = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var usr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.findOne({ where: { username: name } })];
                    case 1:
                        usr = _a.sent();
                        return [2 /*return*/, usr];
                }
            });
        }); };
        /* Metodo utile a trovare un particolare user in base all'email passata come argomento */
        this.findByEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var usr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.findOne({ where: { mail: email } })];
                    case 1:
                        usr = _a.sent();
                        return [2 /*return*/, usr];
                }
            });
        }); };
        /* Metodo utile ad ottenere il credito dell'utente, identificato grazie al nome passato come argomento */
        this.getBudget = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var budget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.findOne({ attributes: ['budget'], where: { username: name } })];
                    case 1:
                        budget = _a.sent();
                        return [2 /*return*/, budget];
                }
            });
        }); };
        /* Metodo necessario per aggiornare il credito dell'utente, passando anche il nuovo credito */
        this.updateBudget = function (name, credit) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.update({ budget: credit }, { where: { username: name } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        var sequelize = singleton_1.Singleton.getInstance().getConnection();
        this.user = sequelize.define('User', {
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            main_role: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            mail: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            budget: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: false
            }
        }, {
            tableName: 'users',
            timestamps: false
        });
    }
    return User;
}());
exports.User = User;
