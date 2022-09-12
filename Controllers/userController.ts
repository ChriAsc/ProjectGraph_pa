import { User } from "../Models/user";
import { ErrEnum } from '../Factory/errorFactory';

/**
 * Classe che implementa il controller dell'utente
**/
export class userController {

    /* Metodo che consente ad un admin di effettuare la ricarica per un utente */
    public rechargeUser = async (req, res, next) => {
        const Us: any = new User();
        try {
            let usr: any = await Us.findByEmail(req.user.mail);
            let old: number = await Us.getBudget(usr.username);
            let new_budget: number = old + parseFloat(req.user.budget);
            await usr.updateBudget(usr.username, new_budget);
            res.status(200).send("La ricarica a " + usr.username + " è avvenuta con successo!");
            next();
        } catch (err) {
            next(ErrEnum.BadRequest);
        }
    }
}