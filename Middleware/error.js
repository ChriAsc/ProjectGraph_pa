"use strict";
exports.__esModule = true;
exports.errorHandler = exports.errorLogger = void 0;
var errorFactory_1 = require("../Factory/errorFactory");
/* Middleware utile a stampare a schermo il log degli errori */
var errorLogger = function (err, req, res, next) {
    var errFactory = new errorFactory_1.ErrorFactory();
    var message = errFactory.getError(err).getErrorMessage();
    var status = errFactory.getError(err).getStatusCode();
    var concreteError = { status_code: status, msg: message };
    console.log(concreteError);
    next(concreteError);
};
exports.errorLogger = errorLogger;
/* Middleware utile a gestire gli errori */
var errorHandler = function (err, req, res, next) {
    res.status(err.status_code).send({ error: err.msg });
};
exports.errorHandler = errorHandler;
