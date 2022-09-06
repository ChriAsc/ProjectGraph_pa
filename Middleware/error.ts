export const errorLogger = (err, req, res, next) => {
    next(err);
}

export const errorHandler = (err, req, res, next) => {
    res.status(500).send({"Errore": err.message});
}