const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facture = sequelize.define('Facture', {
    numero: { type: DataTypes.STRING, allowNull: false, unique: true },
    designation: { type: DataTypes.TEXT, allowNull: false },
    montant_ht: { type: DataTypes.FLOAT, allowNull: false },
    montant_ttc: { type: DataTypes.FLOAT, allowNull: false },
    livraison: { type: DataTypes.BOOLEAN, defaultValue: false },
    statut: { type: DataTypes.ENUM('payé', 'partiel', 'impayé'), defaultValue: 'impayé' },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    signature: { type: DataTypes.TEXT }
}, {
    tableName: 'factures',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Facture;
