// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

// Fichier de routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// Implémente l'app qui est une instance d'express
const app = express();

const verifyJWT = (req, res, next) => {
  const  SECRET_KEY = "secretkey23456";
  const token = req.header('Authorization');

  if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ auth: false, message: 'Invalid token.' });
  }
};

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Implémentation des routes
app.use('/', authRouter); // Nous implémentons les routes d'authentification à part car elles ne nécessitent pas d'être protégées par JWT
// app.use('/api', verifyJWT, indexRouter); // Applique le middleware JWT sur toutes les routes commençant par /api
app.use('/api', indexRouter); // Applique le middleware JWT sur toutes les routes commençant par /api

// Exporte app
module.exports = app;
