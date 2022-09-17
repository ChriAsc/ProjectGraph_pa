/**
 * Interfaccia che rappresenta il Product per la Factory dell'errore.
 * Essa è necessaria a dichiarare i due metodi che vengono implementati dalle classi concrete.
 * Perciò, successivamente si specificheranno il messaggio di errore e lo status code della risposta.
 */
export interface ErrorMessage {
    getErrorMessage(): string;
    getStatusCode(): number;
}