const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Structure = sequelize.define('Structure', {
    nom_structure: { type: DataTypes.STRING(150), allowNull: false },
    adresse: { type: DataTypes.TEXT, allowNull: false },
    telephone: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(150) },
    numero_nif: { type: DataTypes.STRING(50), unique: true },
    numero_rccm: { type: DataTypes.STRING(50), unique: true },
    numero_tva: { type: DataTypes.STRING(50), unique: true },
    tva: { type: DataTypes.DECIMAL(5, 2) },
    css: { type: DataTypes.DECIMAL(5, 2) },
    tps: { type: DataTypes.DECIMAL(5, 2) },
    forme_juridique: { type: DataTypes.STRING(50) },
    site_web: { type: DataTypes.STRING(150) },
    reseaux_sociaux: { type: DataTypes.TEXT },
    logo: { type: DataTypes.TEXT },
    assujetti: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    tableName: 'structures',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Structure;
