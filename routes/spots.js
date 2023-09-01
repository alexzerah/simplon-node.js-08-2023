const express = require('express');
const router = express.Router();
const {Spot} = require("../db.js");

/* /Spots */
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
