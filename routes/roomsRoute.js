const express = require('express');
const router = express.Router();
const {Room} = require('../models');

/* /Rooms */
router.get('/rooms', function(req, res, next) {
  res.json({
    message: {id: 1}
  })
});

router.post('/rooms', function(req, res, next) {
  res.json({message: 'Votre room a bien été créée'});
});

router.put('/rooms', function(req, res, next) {
  res.json({message: 'Votre room a bien été modifiée'});
});

router.delete('/rooms', function(req, res, next) {
  res.json({message: 'Votre room a bien été supprimée'});
});

module.exports = router;
