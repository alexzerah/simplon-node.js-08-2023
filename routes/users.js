const express = require('express');
const router = express.Router();
const {User} = require("../db.js");

/* /Users */ 
router.get('/users', function(req, res, next) {
  res.json({
    message: {email: 'alex@mail.com', firstname: 'Alex', lastname: 'Zerah',}
  });
});

router.post('/users', function(req, res, next) {
  res.json({message: 'Votre compte a bien été créé'});
});

router.put('/users', function(req, res, next) {
  res.json({message: 'Votre compte a bien été modifié'});
});

router.delete('/users', function(req, res, next) {
  res.json({message: 'Votre compte a bien été supprimé'});
});

module.exports = router;
