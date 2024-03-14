'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Reservation, {
        foreignKey: 'userId', // Assurez-vous que 'userId' est la clé étrangère correcte dans votre modèle Reservation
        as: 'reservations', // Optionnel: Alias pour l'association, utile pour les requêtes
        onDelete: 'CASCADE', // Supprimez toutes les réservations associées lors de la suppression d'un utilisateur
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    user_role: DataTypes.STRING,
    user_password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
