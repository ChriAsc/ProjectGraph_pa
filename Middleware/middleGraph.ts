const Graph = require('node-dijkstra');

export const checkStructure = (req, res, next) => {
    try {
        let obj = req.body.graph;
        if(typeof obj === 'undefined') {
            res.sendStatus(400);
        } else {
            let check = new Graph(obj);
            next();
        }
    } catch (err) {
        next(err);
    }
}