// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Fichier de routes
const indexRouter = require('./routes/index');

// Implémente l'app qui est une instance d'express
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Implémentation des routes
app.use('/api', indexRouter);

// Exporte app
module.exports = app;
