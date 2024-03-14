// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const cors = require('cors');
const verifyJWT = require("./middlewares/jwt.middleware");
const morganMiddleware = require("./middlewares/morgan.middleware");
const logger = require("./utils/logger");

// Fichier de routes
const indexRouter = require('./routes/indexRoute');
const authRouter = require('./routes/authRoute');

// Implémente l'app qui est une instance d'express
const app = express();

corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

// Middleware
app.use(morganMiddleware);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

logger.http('Debut session')

// Implémentation des routes
app.use('/', authRouter); // Nous implémentons les routes d'authentification à part car elles ne nécessitent pas d'être protégées par JWT
// app.use('/api', verifyJWT, indexRouter); // Applique le middleware JWT sur toutes les routes commençant par /api
app.use('/api', indexRouter); // Applique le middleware JWT sur toutes les routes commençant par /api

// Exporte app
module.exports = app;
