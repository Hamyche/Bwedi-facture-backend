const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Client = require('./client');
const Category = require('./category');
const Structure = require('./structures');
const Facture = require('./facture');
const Payement = require('./payement');

const db = { sequelize, Sequelize, User, Client, Category, Structure, Facture, Payement };

// Appel automatique de associate() si présent
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
