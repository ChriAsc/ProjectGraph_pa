/* Middleware utile a stampare a schermo il log degli errori */
export const errorLogger = (err, req, res, next) => {
    console.log(err);
    next(err);
}

/* Middleware utile a gestire gli errori */
export const errorHandler = (err, req, res, next) => {
    res.status(500).send({"Errore": err.message});
}