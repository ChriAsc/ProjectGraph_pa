import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checkHeader = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    } else {
        let err = new Error('Header mancante!');
        next(err);
    }
}

export const checkToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        } else {
            let err = new Error ('Token non corretto!');
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

export const verifyAndAuthenticate = (req, res, next) => {
    try {
        var decodedPayload = jwt.verify(req.token, process.env.SECRET_KEY);
        if (decodedPayload !== null) {
            req.user = decodedPayload;
            next();
        }
        else {
            let err = new Error('Autenticazione fallita!')
            next(err);
        }
    } catch (err) {
        next(err);
    }
}