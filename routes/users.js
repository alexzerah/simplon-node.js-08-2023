const express = require('express');
const router = express.Router();
const { User } = require("../db.js");

/* /Users */ 
router.get('/users', async function(req, res, next) {
  const users = await User.findAll({
    attributes: ['email', 'firstName', 'lastName']
  });

  res.json(users);
    
  });

router.post('/users', async function(req, res, next) {

  const { email, firstName, lastName } = req.body;

  const newUser = await User.create({
    email,
    user_password,
    user_role,
    firstName,
    lastName});

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: newUser
    });
});

router.put('/users', function(req, res, next) {
  res.json({message: 'Votre compte a bien été modifié'});
});

router.delete('/users', function(req, res, next) {
  res.json({message: 'Votre compte a bien été supprimé'});
});

module.exports = router;
