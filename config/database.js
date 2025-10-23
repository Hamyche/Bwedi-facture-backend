// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nom de la base
  process.env.DB_USER,      // Utilisateur
  process.env.DB_PASSWORD,  // Mot de passe
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // true pour voir les requêtes SQL
  }
);

// Authentification gérée dans app.js

module.exports = sequelize;
