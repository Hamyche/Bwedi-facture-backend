const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    nom: { type: DataTypes.STRING(100), allowNull: false },
    prenom: { type: DataTypes.STRING(100), allowNull: false },
    nationalite: { type: DataTypes.STRING(100) },
    adresse: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    mot_de_passe: { type: DataTypes.TEXT, allowNull: false },
    categorie: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
