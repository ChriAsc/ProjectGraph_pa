import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { checkHeader, checkToken, verifyAndAuthenticate } from './Middleware/auth';
import { logErrors, errorHandler } from './Middleware/error';

const express = require('express');

dotenv.config();

const PORT = process.env.EXTERNAL_PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

let app = express();

/* middleware utile per il parsing JSON */
app.use(bodyParser());

/* middleware utile per verificare il token JWT */
app.use([checkHeader, checkToken, verifyAndAuthenticate]);

/* middleware di gestione dell'errore */
app.use(logErrors);
app.use(errorHandler);


app.listen(PORT, HOST,);
console.log(`Server in ascolto su http://${HOST}:${PORT}/`);

//app.listen(PORT, HOST, () => console.log(`Server in ascolto su http://${HOST}:${PORT}/`));