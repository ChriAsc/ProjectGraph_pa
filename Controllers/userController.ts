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
            let specific_user: any = await Us.findByEmail(req.user.mail); // si cerca prima lo user tramite mail
            let old: number = specific_user.budget; // si ottiene il budget tramite il nome
            let new_budget: number = old + req.user.budget; // si calcola il nuovo budget, aggiungendo quello vecchio
            let fooo = await Us.updateBudget(specific_user.username, new_budget);   // ricarica effettiva
            res.status(200).send("La ricarica a " + specific_user.username + " (" + new_budget +") è avvenuta con successo!");
            next();
        } catch (err) {
            next(ErrEnum.BadRequest);
        }
    }
}