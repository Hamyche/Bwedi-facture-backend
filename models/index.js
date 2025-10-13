const sequelize = require('../config/database');

const User = require('./user');
const Client = require('./client');
const Category = require('./category');
const Structure = require('./structures');
const Facture = require('./facture');
const Payement = require('./payement');

// 🔗 Associations (une seule fois ici)

// User <-> Client
User.hasMany(Client, { foreignKey: 'user_id' });
Client.belongsTo(User, { foreignKey: 'user_id' });

// User <-> Structure
User.hasMany(Structure, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Structure.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Category <-> Structure
Category.hasMany(Structure, { foreignKey: 'categorie_id', onDelete: 'SET NULL' });
Structure.belongsTo(Category, { foreignKey: 'categorie_id', onDelete: 'SET NULL' });

// User <-> Facture
User.hasMany(Facture, { foreignKey: 'user_id' });
Facture.belongsTo(User, { foreignKey: 'user_id' });

// Client <-> Facture
Client.hasMany(Facture, { foreignKey: 'client_id' });
Facture.belongsTo(Client, { foreignKey: 'client_id' });

// Facture <-> Payement
Facture.hasMany(Payement, { foreignKey: 'facture_id' });
Payement.belongsTo(Facture, { foreignKey: 'facture_id' });

// User <-> Payement
User.hasMany(Payement, { foreignKey: 'user_id' });
Payement.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, User, Client, Category, Structure, Facture, Payement };
