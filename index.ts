import { checkHeader, checkToken, verifyAndAuthenticate, checkUser } from './Middleware/auth';
import { errorLogger, errorHandler } from './Middleware/error';
import { graphController } from './Controllers/graphController';
import { checkAdmin, checkEmail } from './Middleware/admin';
import { userController } from './Controllers/userController';

const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.EXTERNAL_PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

let app = express();

const controllerGraphModel = new graphController();
const controllerUser = new userController();

/* middleware utile per il parsing JSON */
app.use(bodyParser.json());

/* middleware utile per verificare il token JWT */
app.use([checkHeader, checkToken, verifyAndAuthenticate]);

app.post('/addModel', checkUser, async (req, res, next) => {controllerGraphModel.newGraphModel(req, res, next)});
app.post('/executeModel', checkUser, async (req, res, next) => {controllerGraphModel.execModel(req, res, next)});
app.post('/changeWeight', checkUser, async (req, res, next) => {controllerGraphModel.changeEdgeWeight(req, res, next)});
app.get('/models/:nodes/:edges', checkUser, async (req, res, next) => {controllerGraphModel.filterModels(req, res, next)});
app.post('/delete/:ids', checkUser, async (req, res, next) => {controllerGraphModel.deleteModel(req, res, next)});
app.get('/executions', checkUser, async (req, res, next) => {controllerGraphModel.getExecutions(req, res, next)});
app.get('/admin', checkAdmin, checkEmail, async (req, res, next) => {controllerUser.rechargeUser(req, res, next)});

/* middleware di gestione dell'errore */
app.use(errorLogger);
app.use(errorHandler);


app.listen(PORT, HOST,);
console.log(`Server in ascolto su http://${HOST}:${PORT}/`);

//app.listen(PORT, HOST, () => console.log(`Server in ascolto su http://${HOST}:${PORT}/`));