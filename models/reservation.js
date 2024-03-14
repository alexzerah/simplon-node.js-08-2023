'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user2'
      });
    }
  }
  Reservation.init({
    number_of_customers: DataTypes.INTEGER,
    reservation_date: DataTypes.DATE,
    reservation_name: DataTypes.STRING,
    reservation_note: DataTypes.STRING,
    reservation_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
