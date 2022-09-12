import { ErrorFactory } from "../Factory/errorFactory";

/* Middleware utile a stampare a schermo il log degli errori */
export const errorLogger = (err, req, res, next) => {
    const errFactory = new ErrorFactory();
    const message: string = errFactory.getError(err).getErrorMessage();
    const status: number = errFactory.getError(err).getStatusCode();
    let concreteError: any = {status_code: status, msg: message};
    console.log(concreteError);
    next(concreteError);
}

/* Middleware utile a gestire gli errori */
export const errorHandler = (err, req, res, next) => {
    res.status(err.status_code).send({error: err.msg});
}