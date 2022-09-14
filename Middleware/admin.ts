import { User } from "../Models/user";
import { ErrEnum } from "../Factory/errorFactory"

/* Middleware necessario per verificare che la richiesta provenga da un admin esistente (ruolo 2) */
export const checkAdmin = async (req, res, next) => {
    try {
        if(req.user.main_role !== 2) {
            var err = ErrEnum.Unauthorized;
            next(err);
        } else {
            const Us: any = new User();
            let usr: any = await Us.findByName(req.user.username);
            if (usr.username == req.user.username) {
                next();
            }            
    }
    } catch(err) {
        next(ErrEnum.AdminNotFound);
    }
}

/* Middleware necessario per verificare che la mail inserita sia associata ad un utente */
export const checkEmail = async (req, res, next) => {
    try {
        const Us: any = new User();
        let usr: any = await Us.findByEmail(req.body.mail);
        if (usr.mail == req.body.mail) {
        next();
        }
    } catch (err) {
        next(ErrEnum.MailNotFound);
    }
}