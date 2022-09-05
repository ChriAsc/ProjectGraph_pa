import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const express = require('express');

dotenv.config();

const PORT = process.env.EXTERNAL_PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

let app = express();

app.use(bodyParser());
// middleware di gestione dell'errore nel caso di un JSON non valido o non presente
app.use(logErrors);
app.use(errorHandler);



app.listen(PORT, HOST,);
console.log(`Server in ascolto su http://${HOST}:${EXTERNAL_PORT}/`);

//app.listen(PORT, HOST, () => console.log(`Server in ascolto su http://${HOST}:${EXTERNAL_PORT}/`));