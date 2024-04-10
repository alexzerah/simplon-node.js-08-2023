const express = require('express');
const router = express.Router();
const {Reservation} = require('../models');
const reservationController = require('../controllers/reservationController');
const { reservationValidationRules } = require('../middlewares/reservationValidationRules');
const { validationResult } = require('express-validator');

// TODO: implémenter le middleware d'authentification

const resC = new reservationController();

/* /reservations */ 
router.get('/reservations', resC.getReservations.bind(resC));

router.post('/reservations', reservationValidationRules(), (req, res) => {
  console.log(req);
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
  reservationController.createReservation(req, res);
});

router.put('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été modifiée'});
});

router.delete('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été supprimée'});
});

module.exports = router;
