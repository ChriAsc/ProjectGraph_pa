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
                res.status(400).send({"Errore": "I nodi non possono essere vuoti!"});
            } else {
                let check = new Graph(obj);
                next();
            }
        }
    } catch (err) {
        next(err);
    }
}

export const checkWeight = (req, res, next) => {
    try {
        if(typeof req.body.start !== 'number' || typeof req.body.stop !== 'number' || req.body.step !== 'number') {
            res.status(400).send({"Errore": "I valori associati ai pesi e al passo devono essere dei numeri!"});
        }
        let start: number = req.body.start;
        let stop: number = req.body.stop;
        if (start >= stop) {
            res.status(400).send({"Errore": "Il peso di arrivo deve essere maggiore del peso di partenza!"});
        }

        let step: number = req.body.step;
        if (step <= 0) {
            res.status(400).send({"Errore": "Il valore del passo deve essere positivo!"})
        }

        if(step >= (stop-start)) {
            res.status(400).send({"Errore": "Il valore del passo non è ammissibile"})
        }
        next();
    } catch(err) {
        next(err);
    }
}