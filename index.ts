import { checkHeader, checkToken, verifyAndAuthenticate, checkUser } from './Middleware/auth';
import { errorLogger, errorHandler } from './Middleware/error';
import { graphController } from './Controllers/graphController';
import * as auth from './Middleware/auth'

const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.EXTERNAL_PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

let app = express();

let controllerGraphModel = new graphController();

/* middleware utile per il parsing JSON */
app.use(bodyParser.json());

/* middleware utile per verificare il token JWT */
app.use([checkHeader, checkToken, verifyAndAuthenticate]);

app.post("/addModel", auth.checkUser, async (req, res, next) => {controllerGraphModel.newGraphModel(req, res, next)});

/* middleware di gestione dell'errore */
app.use(errorLogger);
app.use(errorHandler);


app.listen(PORT, HOST,);
console.log(`Server in ascolto su http://${HOST}:${PORT}/`);

//app.listen(PORT, HOST, () => console.log(`Server in ascolto su http://${HOST}:${PORT}/`));