// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const SECRET_KEY = 'secretkey23456';

// Simuler une base de données
const users = [];



const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ auth: false, message: 'Invalid token.' });
  }
};

// Sign-up (Inscription)
app.post('/signup', async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = {
    username: req.body.username,
    password: hashedPassword
  };
  users.push(user);
  res.status(201).send('Utilisateur créé');
});


// Sign-in (Connexion)
app.post('/signin', async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  if (!user) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');

  const payload = {
    username: user.username,
    // Vous pouvez ajouter d'autres propriétés ici
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.json({message: "token"});
});

// auth
app.get('/auth', (req, res) => {
  const payload = {
    username: user.username,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
  res.json({ auth: true, token });
})

// Implémentation des routes
app.use('/api', verifyJWT, indexRouter); // Applique le middleware JWT sur toutes les routes commençant par /api

// Exporte app
module.exports = app;
