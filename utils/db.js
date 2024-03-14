const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env]; // Assurez-vous que le chemin est correct

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: console.log, // Vous pouvez désactiver les logs en passant false
  // Ajoutez d'autres options nécessaires ici
});

module.exports = { sequelize, Sequelize };
