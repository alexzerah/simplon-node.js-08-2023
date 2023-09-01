const express = require('express');
const router = express.Router();

const reservationsRouter = require('./reservations');
const usersRouter = require('./users');
const spotsRouter = require('./spots');
const roomsRouter = require('./rooms');

router.use(reservationsRouter);
router.use(usersRouter);
router.use(spotsRouter);
router.use(roomsRouter);

module.exports = router;
