export const errorLogger = (err, req, res, next) => {
    //console.log(err);
    next(err);
}

export const errorHandler = (err, req, res, next) => {
    res.status(500).send({"Errore": err.message});
}