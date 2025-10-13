const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    telephone: { type: DataTypes.STRING },
    adresse: { type: DataTypes.TEXT },
    nif: { type: DataTypes.STRING, unique: true },
    rccm: { type: DataTypes.STRING, unique: true },
    tva: { type: DataTypes.STRING, unique: true }
}, {
    tableName: 'clients',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Client;
