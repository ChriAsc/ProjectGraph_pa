"use strict";
exports.__esModule = true;
exports.ErrorFactory = exports.ErrEnum = void 0;
/* Ogni classe che implementa il Product rappresenta un Concrete Creator */
var ErrEnum;
(function (ErrEnum) {
    ErrEnum[ErrEnum["Generic"] = 0] = "Generic";
    ErrEnum[ErrEnum["Forbidden"] = 1] = "Forbidden";
    ErrEnum[ErrEnum["BadRequest"] = 2] = "BadRequest";
    ErrEnum[ErrEnum["Unauthorized"] = 3] = "Unauthorized";
    ErrEnum[ErrEnum["MissingHeader"] = 4] = "MissingHeader";
    ErrEnum[ErrEnum["MissingToken"] = 5] = "MissingToken";
    ErrEnum[ErrEnum["InvalidToken"] = 6] = "InvalidToken";
    ErrEnum[ErrEnum["MalformedPayload"] = 7] = "MalformedPayload";
    ErrEnum[ErrEnum["UserNotFound"] = 8] = "UserNotFound";
    ErrEnum[ErrEnum["AdminNotFound"] = 9] = "AdminNotFound";
    ErrEnum[ErrEnum["MailNotFound"] = 10] = "MailNotFound";
    ErrEnum[ErrEnum["InvalidBudget"] = 11] = "InvalidBudget";
    ErrEnum[ErrEnum["InvalidNode"] = 12] = "InvalidNode";
    ErrEnum[ErrEnum["EmptyNode"] = 13] = "EmptyNode";
    ErrEnum[ErrEnum["NaNWeight"] = 14] = "NaNWeight";
    ErrEnum[ErrEnum["InvalidWeights"] = 15] = "InvalidWeights";
    ErrEnum[ErrEnum["NaNStep"] = 16] = "NaNStep";
    ErrEnum[ErrEnum["NegativeStep"] = 17] = "NegativeStep";
    ErrEnum[ErrEnum["InvalidStep"] = 18] = "InvalidStep";
})(ErrEnum = exports.ErrEnum || (exports.ErrEnum = {}));
/* Internale Server Error */
var GenericError = /** @class */ (function () {
    function GenericError() {
    }
    GenericError.prototype.getErrorMessage = function () {
        return "Errore Generico!";
    };
    GenericError.prototype.getStatusCode = function () {
        return 500;
    };
    return GenericError;
}());
var Forbidden = /** @class */ (function () {
    function Forbidden() {
    }
    Forbidden.prototype.getErrorMessage = function () {
        return "Forbidden!";
    };
    Forbidden.prototype.getStatusCode = function () {
        return 403;
    };
    return Forbidden;
}());
var BadRequest = /** @class */ (function () {
    function BadRequest() {
    }
    BadRequest.prototype.getErrorMessage = function () {
        return "Bad Request!";
    };
    BadRequest.prototype.getStatusCode = function () {
        return 400;
    };
    return BadRequest;
}());
var Unauthorized = /** @class */ (function () {
    function Unauthorized() {
    }
    Unauthorized.prototype.getErrorMessage = function () {
        return "Unauthorized!";
    };
    Unauthorized.prototype.getStatusCode = function () {
        return 401;
    };
    return Unauthorized;
}());
var MissingHeader = /** @class */ (function () {
    function MissingHeader() {
    }
    MissingHeader.prototype.getErrorMessage = function () {
        return "Header Mancante!";
    };
    MissingHeader.prototype.getStatusCode = function () {
        return 400;
    };
    return MissingHeader;
}());
var MissingToken = /** @class */ (function () {
    function MissingToken() {
    }
    MissingToken.prototype.getErrorMessage = function () {
        return "Token Mancante!";
    };
    MissingToken.prototype.getStatusCode = function () {
        return 400;
    };
    return MissingToken;
}());
var InvalidToken = /** @class */ (function () {
    function InvalidToken() {
    }
    InvalidToken.prototype.getErrorMessage = function () {
        return "Token non valido!";
    };
    InvalidToken.prototype.getStatusCode = function () {
        return 403;
    };
    return InvalidToken;
}());
var MalformedPayload = /** @class */ (function () {
    function MalformedPayload() {
    }
    MalformedPayload.prototype.getErrorMessage = function () {
        return "Malformed payload!";
    };
    MalformedPayload.prototype.getStatusCode = function () {
        return 400;
    };
    return MalformedPayload;
}());
var UserNotFound = /** @class */ (function () {
    function UserNotFound() {
    }
    UserNotFound.prototype.getErrorMessage = function () {
        return "Utente non trovato!";
    };
    UserNotFound.prototype.getStatusCode = function () {
        return 404;
    };
    return UserNotFound;
}());
var AdminNotFound = /** @class */ (function () {
    function AdminNotFound() {
    }
    AdminNotFound.prototype.getErrorMessage = function () {
        return "Admin non trovato!";
    };
    AdminNotFound.prototype.getStatusCode = function () {
        return 404;
    };
    return AdminNotFound;
}());
var MailNotFound = /** @class */ (function () {
    function MailNotFound() {
    }
    MailNotFound.prototype.getErrorMessage = function () {
        return "Mail non trovata!";
    };
    MailNotFound.prototype.getStatusCode = function () {
        return 404;
    };
    return MailNotFound;
}());
var InvalidBudget = /** @class */ (function () {
    function InvalidBudget() {
    }
    InvalidBudget.prototype.getErrorMessage = function () {
        return "Il budget deve essere positivo!";
    };
    InvalidBudget.prototype.getStatusCode = function () {
        return 403;
    };
    return InvalidBudget;
}());
var InvalidNode = /** @class */ (function () {
    function InvalidNode() {
    }
    InvalidNode.prototype.getErrorMessage = function () {
        return "I nodi devono essere identificati dal tipo stringa!";
    };
    InvalidNode.prototype.getStatusCode = function () {
        return 400;
    };
    return InvalidNode;
}());
var EmptyNode = /** @class */ (function () {
    function EmptyNode() {
    }
    EmptyNode.prototype.getErrorMessage = function () {
        return "I nodi non possono essere vuoti!";
    };
    EmptyNode.prototype.getStatusCode = function () {
        return 400;
    };
    return EmptyNode;
}());
var NaNWeight = /** @class */ (function () {
    function NaNWeight() {
    }
    NaNWeight.prototype.getErrorMessage = function () {
        return "Il valore del peso deve essere un numero!";
    };
    NaNWeight.prototype.getStatusCode = function () {
        return 403;
    };
    return NaNWeight;
}());
var InvalidWeights = /** @class */ (function () {
    function InvalidWeights() {
    }
    InvalidWeights.prototype.getErrorMessage = function () {
        return "Il peso di arrivo deve essere maggiore del peso di partenza!";
    };
    InvalidWeights.prototype.getStatusCode = function () {
        return 403;
    };
    return InvalidWeights;
}());
var NaNStep = /** @class */ (function () {
    function NaNStep() {
    }
    NaNStep.prototype.getErrorMessage = function () {
        return "Il valore del passo deve essere un numero!";
    };
    NaNStep.prototype.getStatusCode = function () {
        return 400;
    };
    return NaNStep;
}());
var NegativeStep = /** @class */ (function () {
    function NegativeStep() {
    }
    NegativeStep.prototype.getErrorMessage = function () {
        return "Il valore del passo deve essere positivo!";
    };
    NegativeStep.prototype.getStatusCode = function () {
        return 403;
    };
    return NegativeStep;
}());
var InvalidStep = /** @class */ (function () {
    function InvalidStep() {
    }
    InvalidStep.prototype.getErrorMessage = function () {
        return "Il valore del passo non è ammissibile";
    };
    InvalidStep.prototype.getStatusCode = function () {
        return 403;
    };
    return InvalidStep;
}());
/**
 * Classe che rappresenta effettivamente la Factory e che permette di gestire
 * le possibili eccezioni sollevate negli strati middleware
 */
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory() {
    }
    /* Funzione invocata dagli strati middleware che restituisce il messaggio
    di errore e lo status code in base al parametro passato */
    ErrorFactory.prototype.getError = function (errType) {
        var valErr;
        switch (errType) {
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
                valErr = new GenericError();
                break;
        }
        return valErr;
    };
    return ErrorFactory;
}());
exports.ErrorFactory = ErrorFactory;
