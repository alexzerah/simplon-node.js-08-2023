const express = require('express');
const router = express.Router();

const {User} = require('../models');

/* /GET */ 
router.get('/users', async function(req, res, next) {
  const users = await User.findAll({
    attributes: ['email', 'firstName', 'lastName']
  });

  res.json(users);
    
  });

/* /POST */ 
router.post('/users', async function(req, res, next) {

  try {
    // Destructurer et vérifier l'existence des champs requis
    const { email, firstName, lastName, password } = req.body;

    if (!email || !firstName || !lastName || !password) {
      // Lancer une nouvelle erreur si l'un des champs est manquant
      throw new Error('Tous les champs (email, firstName, lastName, password) sont requis.');
    }
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    // Gérer l'erreur en cas de champ manquant ou autre problème
    res.status(400).json({ error: error.message });
  }
});

/* /PUT */ 
router.put('/users', function(req, res, next) {
  res.json({message: 'Votre compte a bien été modifié'});
});

/* /DELETE */ 
router.delete('/users', function(req, res, next) {
  res.json({message: 'Votre compte a bien été supprimé'});
});

module.exports = router;
