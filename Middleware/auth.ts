import { User } from "../Models/user";
import { ErrEnum } from "../Factory/errorFactory"

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

/* Middleware necessario per controllare se è presente l'header */
export const checkHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    } else {
        var err = ErrEnum.MissingHeader;
        next(err);
    }
}

/* Middleware necessario per controllare che il token sia presente */
export const checkToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        }
    } catch (err) {
        next(ErrEnum.MissingToken);
    }
}

/* Middleware necessario per verificare e autenticare, controllando che il token sia valido */
export const verifyAndAuthenticate = (req, res, next) => {
    try {
        var decodedPayload = jwt.verify(req.token, process.env.SECRET_KEY as string);
        if (decodedPayload !== null) {
            req.user = decodedPayload;
            next();
        }
    } catch (err) {
        next(ErrEnum.InvalidToken);
    }
}

/* Middleware necessario per verificare che la richiesta provenga da un utente esistente (ruolo 1) */
export const checkUser = async (req, res, next) => {
    try {
        if(req.user.main_role !== 1) {
            var err = ErrEnum.Unauthorized;
            next(err);
        } else {
            const usr: any = new User();
            await usr.findByName(req.user.username);
            next();
    }
    } catch(err) {
        next(ErrEnum.UserNotFound);
    }
}