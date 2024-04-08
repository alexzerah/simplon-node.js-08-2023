'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
        Room.hasMany(models.Spot, { foreignKey: 'roomId' });
    }
  }
  Room.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });

  return Room;
};

