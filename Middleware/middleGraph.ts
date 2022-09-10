const Graph = require('node-dijkstra');

export const checkStructure = (req, res, next) => {
    try {
        let obj: object = req.body.graph;
        if(typeof obj === 'undefined') {
            res.sendStatus(400);
        } else {
            let nodeCheck = Object.keys(obj).filter(element => element === '');
            let foo = Object.values(obj);
            let edgeCheck = foo.filter(element => element['']);
            if (nodeCheck.length != 0 || edgeCheck.length != 0) {
                res.status(400).send("I nodi non possono essere vuoti!");
            } else {
                let check = new Graph(obj);
                next();
            }
        }
    } catch (err) {
        next(err);
    }
}