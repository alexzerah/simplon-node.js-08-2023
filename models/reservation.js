'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
        Reservation.belongsToMany(models.Spot, { through: 'ReservationSpots', foreignKey: 'ReservationId'});
    }
  }

  Reservation.init({
    number_of_customers: DataTypes.INTEGER,
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reservation',
  });

  return Reservation;
};
