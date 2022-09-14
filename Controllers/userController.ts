import { User } from "../Models/user";
import { ErrEnum } from '../Factory/errorFactory';

/**
 * Classe che implementa il controller dell'utente
**/
export class userController {

    /* Metodo che consente ad un admin di effettuare la ricarica per un utente */
    public rechargeUser = async (req, res, next) => {
        const Us: any = new User();
        if(req.user.budget < 0) {
            next(ErrEnum.InvalidBudget);
        } else {
            try {
                let specific_user: any = await Us.findByEmail(req.user.mail); // si cerca prima lo user tramite mail
                let old: number = parseFloat(specific_user.budget);// si ottiene il budget tramite il nome
                let new_budget: number = old + req.user.budget; // si calcola il nuovo budget, aggiungendo quello vecchio
                await Us.updateBudget(specific_user.username, new_budget);   // ricarica effettiva
                res.status(200).send("La ricarica a " + specific_user.username + " (" + new_budget +") è avvenuta con successo!");
                next();
            } catch (err) {
                next(ErrEnum.BadRequest);
            }
        }
    }

    public createUser = async (req, res, next) => {
        const Us: any = new User();
        if(req.user.budget < 0) next(ErrEnum.InvalidBudget);
        else {
            if(req.user.mail == '') next(ErrEnum.InvalidMail);
            else {
                try {
                    let new_user: any = await Us.addUser(req.user.name, req.user.mail, req.user.budget);
                    res.status(201).send("Utente creato!");
                    next();
                } catch (err) {
                    next(ErrEnum.ExistingUser);
                }
            }
        }
        
    }
}