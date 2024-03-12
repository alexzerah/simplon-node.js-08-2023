const express = require('express');
const router = express.Router();

// Import des routes
const reservationsRouter = require('./reservationsRoute');
const usersRouter = require('./usersRoute');
const spotsRouter = require('./spotsRoute');
const roomsRouter = require('./roomsRoute');

// Mise en place du router
router.use(reservationsRouter);
router.use(usersRouter);
router.use(spotsRouter);
router.use(roomsRouter);

module.exports = router;
