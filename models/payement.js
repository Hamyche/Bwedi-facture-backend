const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payement = sequelize.define('Payement', {
    montant: { type: DataTypes.FLOAT, allowNull: false },
    mode: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'payements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Payement;
