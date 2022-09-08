import { User } from "../Models/user";

export const checkAdmin = (req, res, next) => {
    try {
        if (req.user.main_role === 2) {
            next();
        } else {
            var err = new Error('Ammesso solo ruolo admin!');
            next(err);
        }
    } catch(err) {
        next(err);
    }
}

export const checkEmail = async (req, res, next) => {
    try {
        let Us: any = new User();
        let usr: any = await Us.findByEmail(req.user.mail);
        if (usr.mail !== req.user.mail) {
            var err = new Error('Email non corretta!');
            next(err);
        } else
        next();
    } catch (err) {
        next(err);
    }
}