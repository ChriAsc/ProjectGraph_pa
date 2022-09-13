import { ErrEnum } from "../Factory/errorFactory";

const Graph = require('node-dijkstra');

export const checkStructure = (req, res, next) => {
    try {
        let obj: object = req.body.graph;
        if(typeof obj === 'undefined') {
            next(ErrEnum.BadRequest)
        } else {
            let nodeCheck = Object.keys(obj).filter(element => element === '');
            let foo = Object.values(obj);
            let edgeCheck = foo.filter(element => element['']);
            if (nodeCheck.length != 0 || edgeCheck.length != 0) {
                next(ErrEnum.EmptyNode)
            } else {
                let check = new Graph(obj);
                next();
            }
        }
    } catch (err) {
        next(ErrEnum.MalformedPayload);
    }
}

export const checkWeight = (req, res, next) => {
    try {

        if(typeof req.body.startWeight !== "number") next(ErrEnum.NaNWeight);
        if(typeof req.body.stopWeight !== "number") next(ErrEnum.NaNWeight);

        let start: number = req.body.startWeight;
        let stop: number = req.body.stopWeight;
        let range: number = stop - start;

        if (start >= stop || start < 0) {
            var err = ErrEnum.InvalidWeights;
            next(err);
        }
        if(typeof req.body.step !== "number") next(ErrEnum.NaNStep);
        
        let step: number = req.body.step;
        if (step <= 0) {
            var err = ErrEnum.NegativeStep;
            next(err);
        }

        if(step > range) {
            var err = ErrEnum.InvalidStep;
        }
        next();
    } catch(err) {
        next(ErrEnum.Generic);
    }
}