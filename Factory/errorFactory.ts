import { ErrorMessage } from "./interface";

/* Ogni classe che implementa il Product rappresenta un Concrete Creator */
export enum ErrEnum {
    Generic,
    Forbidden,
    BadRequest,
    Unauthorized,
    MissingHeader,
    MissingToken,
    InvalidToken,
    MalformedPayload,
    UserNotFound,
    AdminNotFound,
    MailNotFound,
    InvalidBudget,
    InvalidNode,
    EmptyNode,
    NaNWeight,
    InvalidWeights,
    NaNStep,
    NegativeStep,
    InvalidStep
}

/* Internale Server Error */
class GenericError implements ErrorMessage {
    getErrorMessage(): string {
        return "Errore Generico!";
    }
    getStatusCode(): number {
        return 500;
    }
}

class Forbidden implements ErrorMessage {
    getErrorMessage(): string {
        return "Forbidden!";
    }
    getStatusCode(): number {
        return 403;
    }
}

class BadRequest implements ErrorMessage {
    getErrorMessage(): string {
        return "Bad Request!";
    }
    getStatusCode(): number {
        return 400;
    }
}

class Unauthorized implements ErrorMessage {
    getErrorMessage(): string {
        return "Unauthorized!";
    }
    getStatusCode(): number {
        return 401;
    }
}

class MissingHeader implements ErrorMessage {
    getErrorMessage(): string {
        return "Header Mancante!";
    }
    getStatusCode(): number {
        return 400;
    }
}

class MissingToken implements ErrorMessage {
    getErrorMessage(): string {
        return "Token Mancante!";
    }
    getStatusCode(): number {
        return 400;
    }
}

class InvalidToken implements ErrorMessage {
    getErrorMessage(): string {
        return "Token non valido!";
    }
    getStatusCode(): number {
        return 403;
    }
}

class MalformedPayload implements ErrorMessage {
    getErrorMessage(): string {
        return "Malformed payload!";
    }
    getStatusCode(): number {
        return 400;
    }
}

class UserNotFound implements ErrorMessage {
    getErrorMessage(): string {
        return "Utente non trovato!";
    }
    getStatusCode(): number {
        return 404;
    }
}

class AdminNotFound implements ErrorMessage {
    getErrorMessage(): string {
        return "Admin non trovato!";
    }
    getStatusCode(): number {
        return 404;
    }
}

class MailNotFound implements ErrorMessage {
    getErrorMessage(): string {
        return "Mail non trovata!";
    }
    getStatusCode(): number {
        return 404;
    }
}

class InvalidBudget implements ErrorMessage {
    getErrorMessage(): string {
        return "Il budget deve essere positivo!";
    }
    getStatusCode(): number {
        return 403;
    }
}

class InvalidNode implements ErrorMessage {
    getErrorMessage(): string {
        return "I nodi devono essere estremi di un arco esistente!"
    }
    getStatusCode(): number {
        return 400;
    }

}

class EmptyNode implements ErrorMessage {
    getErrorMessage(): string {
        return "I nodi non possono essere vuoti!";
    }
    getStatusCode(): number {
        return 400;
    }
}

class NaNWeight implements ErrorMessage {
    getErrorMessage(): string {
        return "Il valore del peso deve essere un numero!";
    }
    getStatusCode(): number {
        return 403;
    }
}
class InvalidWeights implements ErrorMessage {
    getErrorMessage(): string {
        return "Il peso di arrivo deve essere maggiore del peso di partenza!";
    }
    getStatusCode(): number {
        return 403;
    }
}

class NaNStep implements ErrorMessage {
    getErrorMessage(): string {
        return "Il valore del passo deve essere un numero!";
    }
    getStatusCode(): number {
        return 400;
    }
}

class NegativeStep implements ErrorMessage {
    getErrorMessage(): string {
        return "Il valore del passo deve essere positivo!";
    }
    getStatusCode(): number {
        return 403;
    }
}

class InvalidStep implements ErrorMessage {
    getErrorMessage(): string {
        return "Il valore del passo deve essere in un range ammissabile!";
    }
    getStatusCode(): number {
        return 403;
    }
}

/**
 * Classe che rappresenta effettivamente la Factory e che permette di gestire
 * le possibili eccezioni sollevate negli strati middleware
 */
export class ErrorFactory {
    constructor() {
    }

    /* Funzione invocata dagli strati middleware che restituisce il messaggio
    di errore e lo status code in base al parametro passato */
    public getError(errType: ErrEnum): ErrorMessage {
        let valErr: ErrorMessage;
        switch(errType) {
            case ErrEnum.Generic:
                valErr = new GenericError();
                break;
            case ErrEnum.Forbidden:
                valErr = new Forbidden();
                break;
            case ErrEnum.BadRequest:
                valErr = new BadRequest();
                break;
            case ErrEnum.Unauthorized:
                valErr = new Unauthorized();
                break;
            case ErrEnum.MissingHeader:
                valErr = new MissingHeader();
                break;
            case ErrEnum.MissingToken:
                valErr = new MissingToken();
                break;
            case ErrEnum.InvalidToken:
                valErr = new InvalidToken();
                break;
            case ErrEnum.MalformedPayload:
                valErr = new MalformedPayload();
                break;
            case ErrEnum.UserNotFound:
                valErr = new UserNotFound();
                break;
            case ErrEnum.AdminNotFound:
                valErr = new AdminNotFound();
                break;
            case ErrEnum.MailNotFound:
                valErr = new MailNotFound();
                break;
            case ErrEnum.InvalidBudget:
                valErr = new InvalidBudget();
                break;
            case ErrEnum.InvalidNode:
                valErr = new InvalidNode();
                break;
            case ErrEnum.EmptyNode:
                valErr = new EmptyNode();
                break;
            case ErrEnum.NaNWeight:
                valErr = new NaNWeight();
                break;
            case ErrEnum.InvalidWeights:
                valErr = new InvalidWeights();
                break;
            case ErrEnum.NaNStep:
                valErr = new NaNStep();
                break;
            case ErrEnum.NegativeStep:
                valErr = new NegativeStep();
                break;
            case ErrEnum.InvalidStep:
                valErr = new InvalidStep();
                break;
            default:
                console.log("Non previsto");
                valErr = new GenericError()
                break;
        }

        return valErr;
    }
}