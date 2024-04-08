const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const userSeed = require('../seeds/user.seed');
const spotSeed = require("../seeds/spot.seed");
const roomSeed = require("../seeds/room.seed");
const reservationSeed = require("../seeds/reservation.seed");
const membershipSeed = require("../seeds/membership.seed");
// const reservationSpotSeed = require("../seeds/reservationSpot.seed");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const user = require("../models/user")(sequelize, Sequelize);
const membership = require("../models/membership")(sequelize, Sequelize);
const room = require("../models/room")(sequelize, Sequelize);
const spot = require("../models/spot")(sequelize, Sequelize);
const reservation = require("../models/reservation")(sequelize, Sequelize);
// const reservationSpot = require("../ReservationSpot")(sequelize, Sequelize);

reservation.belongsToMany(spot, { through: 'ReservationSpots' });
spot.belongsToMany(reservation, { through: 'ReservationSpots' });

sequelize.sync({force: true}).then(
    async () => {
        await userSeed();
        await roomSeed();
        await reservationSeed();
        await spotSeed();
        await membershipSeed();
        // await reservationSpotSeed();
        console.log('Database and tables created!');
    }
).catch(e => {
    console.error('Database and tables creation failed!', e);
});

module.exports = { sequelize, Sequelize };
