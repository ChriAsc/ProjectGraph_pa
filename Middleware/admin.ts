import { User } from "../Models/user";

/* Middleware necessario per verificare che la richiesta provenga da un admin esistente (ruolo 2) */
export const checkAdmin = async (req, res, next) => {
    try {
        if(req.user.main_role !== 2) {
            var err = new Error('Ammesso solo ruolo admin!');
            next(err);
        } else {
            const Us: any = new User();
            let usr: any = await Us.findByName(req.user.username);
            if (usr.username !== req.user.username) {
                var err = new Error('Admin non trovato!');
                next(err);
            } else
            next();
    }
    } catch(err) {
        next(err);
    }
}

/* Middleware necessario per verificare che la mail inserita sia associata ad un utente */
export const checkEmail = async (req, res, next) => {
    try {
        const Us: any = new User();
        let usr: any = await Us.findByEmail(req.user.mail);
        if (usr.mail !== req.user.mail) {
            var err = new Error('Email dell\'utente non corretta!');
            next(err);
        } else
        next();
    } catch (err) {
        next(err);
    }
}