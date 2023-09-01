const express = require('express');
const router = express.Router();
const {Reservation, User, Room, Spot} = require("../db.js");

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

router.post('/reservations', function(req, res, next) {
  const {id_user, id_spot, id_room, number_of_customers, reservation_date, reservation_name, reservation_note, reservation_status } = req.body;
  console.log(req.body);

  if (!reservation_name) {
    res.status(422).json({error: "Le nom de la réservation est obligatoire"});
  }

  if (typeof number_of_customers !== 'number' || !Number.isInteger(number_of_customers)) {
    res.status(422).json({error: "Le format du nombre de convive n'est pas bon (Nombre d'entier attendu)"});
  }

  if (!reservation_note) {}

  if (!reservation_date) {
    res.status(422).json({error: "La date de réservation est obligatoire"});
  }

  if (!id_spot && !id_room) {
    res.status(422).json({message:"Vous devez renseigner un spot ou une room"});
  }

  // Enregistrer les informations dans la base
  const r1 = Reservation.build({
    id_user: id_user,
    number_of_customers: number_of_customers,
    reservation_date: reservation_date,
    reservation_name: reservation_name,
    reservation_note: reservation_note,
    reservation_status: reservation_status,
  });
  
  r1.save().then(
    () => console.log("Réservation enregistrée")
  );

  res.json({message: 'Votre reservation a bien été enregistrée'});
});

router.put('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été modifiée'});
});

router.delete('/reservations', function(req, res, next) {
  res.json({message: 'Votre reservation a bien été supprimée'});
});

/* /users */ 

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

/* /rooms */

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

/* /spots */

router.get('/spots', function(req, res, next) {
  res.json({
    message: {id: 1}
  })
});

router.post('/spots', function(req, res, next) {
  res.json({message: 'Votre spot a bien été créé'});
});

router.put('/spots', function(req, res, next) {
  res.json({message: 'Votre spot a bien été modifié'});
});

router.delete('/spots', function(req, res, next) {
  res.json({message: 'Votre spot a bien été supprimé'});
}
);

module.exports = router;
