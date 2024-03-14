const express = require('express');
const router = express.Router();
const {Reservation} = require('../models');
const reservationController = require('../controllers/reservationController');

/* /reservations */ 
router.get('/reservations', reservationController.getReservations);

router.post('/reservations', reservationController.createReservation);

router.put('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été modifiée'});
});

router.delete('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été supprimée'});
});

module.exports = router;
