const express = require('express');
const router = express.Router();

// Import des routes
const reservationsRouter = require('./reservations');
const usersRouter = require('./users');
const spotsRouter = require('./spots');
const roomsRouter = require('./rooms');

// Mise en place du router
router.use(reservationsRouter);
router.use(usersRouter);
router.use(spotsRouter);
router.use(roomsRouter);

module.exports = router;
