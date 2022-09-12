import { ErrorMessage } from "./interface";

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
    EmptyNode,
    InvalidStartWeight,
    InvalidStopWeight,
    InvalidWeights,
    NaNStep,
    NegativeStep,
    InvalidStep
}

class GenericError implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Errore Generico!"};
    }
}

class Forbidden implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Forbidden!"};
    }
}

class BadRequest implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Bad Request!"};
    }
}

class Unauthorized implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Unauthorized!"};
    }
}

class MissingHeader implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Header Mancante!"};
    }
}

class MissingToken implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Token Mancante!"};
    }
}

class InvalidToken implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Token non valido!"};
    }
}

class MalformedPayload implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Malformed payload!"};
    }
}

class UserNotFound implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Utente non trovato!"};
    }
}

class AdminNotFound implements ErrorMessage {
    getErrorMessage(): object {
        return {error: "Admin non trovato!"};
    }
}

class MailNotFound implements ErrorMessage {
    getErrorMessage() {
        return {error: "Mail non trovata!"};
    }
}

class EmptyNode implements ErrorMessage {
    getErrorMessage() {
        return {error: "I nodi non possono essere vuoti!"};
    }
}

class InvalidStartWeight implements ErrorMessage {
    getErrorMessage() {
        return {error: "Il peso di partenza deve essere un numero!"};
    }
}

class InvalidStopWeight implements ErrorMessage {
    getErrorMessage() {
        return {error: "Il peso di arrivo deve essere un numero!"};
    }
}

class InvalidWeights implements ErrorMessage {
    getErrorMessage() {
        return {error: "Il peso di arrivo deve essere maggiore del peso di partenza!"};
    }
}

class NaNStep implements ErrorMessage {
    getErrorMessage() {
        return {error: "Il valore del passo deve essere un numero!"};
    }
}

class NegativeStep implements ErrorMessage {
    getErrorMessage() {
        return {error: "Il valore del passo deve essere positivo!"};
    }
}

class InvalidStep implements ErrorMessage {
    getErrorMessage() {
        return {error: "Il valore del passo non è ammissibile"};
    }
}

export class ErrorFactory {
    constructor() {
    }

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
            case ErrEnum.EmptyNode:
                valErr = new EmptyNode();
                break;
            case ErrEnum.InvalidStartWeight:
                valErr = new InvalidStartWeight();
                break;
            case ErrEnum.InvalidStopWeight:
                valErr = new InvalidStopWeight();
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