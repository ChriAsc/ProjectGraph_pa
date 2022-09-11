import { User } from "../Models/user";

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

/* Middleware necessario per controllare se è presente l'header */
export const checkHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    } else {
        var err = new Error('Header mancante!');
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
        } else {
            var err = new Error ('Token non corretto!');
            next(err);
        }
    } catch (err) {
        next(err);
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
        else {
            var err = new Error('Autenticazione fallita!')
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

/* Middleware necessario per verificare che la richiesta provenga da un utente esistente (ruolo 1) */
export const checkUser = async (req, res, next) => {
    try {
        if(req.user.main_role !== 1) {
            var err = new Error('Ammesso solo ruolo user!');
            next(err);
        } else {
            const usr: any = new User();
            await usr.findByName(req.user.username).catch(err => new Error('User non trovato!'));
            next();
    }
    } catch(err) {
        next(err);
    }
}