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

sequelize.authenticate()
  .then(() => console.log('✅ Connecté à PostgreSQL via Sequelize'))
  .catch(err => console.error('❌ Échec de la connexion :', err));

module.exports = sequelize;
