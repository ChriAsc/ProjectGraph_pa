"use strict";
exports.__esModule = true;
exports.checkWeight = exports.checkStructure = void 0;
var errorFactory_1 = require("../Factory/errorFactory");
var Graph = require('node-dijkstra');
var checkStructure = function (req, res, next) {
    try {
        var obj = req.body;
        if (typeof obj === 'undefined') {
            next(errorFactory_1.ErrEnum.BadRequest);
        }
        else {
            var nodeCheck = Object.keys(obj).filter(function (element) { return element === ''; });
            var foo = Object.values(obj);
            var edgeCheck = foo.filter(function (element) { return element['']; });
            if (nodeCheck.length != 0 || edgeCheck.length != 0) {
                next(errorFactory_1.ErrEnum.EmptyNode);
            }
            else {
                var check = new Graph(obj);
                next();
            }
        }
    }
    catch (err) {
        next(errorFactory_1.ErrEnum.MalformedPayload);
    }
};
exports.checkStructure = checkStructure;
var checkWeight = function (req, res, next) {
    try {
        if (typeof req.body.startWeight !== "number")
            next(errorFactory_1.ErrEnum.NaNWeight);
        if (typeof req.body.stopWeight !== "number")
            next(errorFactory_1.ErrEnum.NaNWeight);
        if (typeof req.body.step !== "number") {
            var err = errorFactory_1.ErrEnum.NaNStep;
            next(err);
        }
        var start = req.body.startWeight;
        var stop_1 = req.body.stopWeight;
        var range = stop_1 - start;
        var step = req.body.step;
        if (start >= stop_1 || start < 0) {
            var err = errorFactory_1.ErrEnum.InvalidWeights;
            next(err);
        }
        else if (step <= 0) {
            var err = errorFactory_1.ErrEnum.NegativeStep;
            next(err);
        }
        else if (step > range) {
            var err = errorFactory_1.ErrEnum.InvalidStep;
        }
        else
            next();
    }
    catch (err) {
        next(errorFactory_1.ErrEnum.Generic);
    }
};
exports.checkWeight = checkWeight;
