const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretkey23456';

// Simuler une base de données
const users = [];

console.log(users);

// Sign-up (Inscription)
router.post('/signup', async (req, res) => {
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
router.post('/signin', async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  if (!user) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');

  const payload = {
    username: user.username,
    // Vous pouvez ajouter d'autres propriétés ici
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.json({message: token});
});

// auth
router.get('/auth', (req, res) => {
  const payload = {
    username: user.username,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
  res.json({ auth: true, token });
})

module.exports = router;
