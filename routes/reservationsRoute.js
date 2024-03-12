const express = require('express');
const router = express.Router();
const {Reservation} = require('../models');
const reservationController = require('../controllers/reservationController');

/* /reservations */ 
router.get('/reservations', function(req, res, next) {
  res.json(
    { message: {
      "reservations": [
        {
          id: 1,
          number_of_customers: 3,
          reservation_date: '2021-01-01',
          reservation_name: 'Jean',
          reservation_note: 'Pas de note',
          reservation_status: 1,
          spot: 1
        }
      ]
    }}
  )
});

router.post('/reservations', reservationController.createReservation);

router.put('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été modifiée'});
});

router.delete('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été supprimée'});
});

module.exports = router;
