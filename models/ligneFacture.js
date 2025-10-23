// models/LigneFacture.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LigneFacture = sequelize.define('LigneFacture', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    prix_unitaire: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total_ht: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    facture_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'factures', key: 'id' }
    }
}, {
    tableName: 'lignes_facture',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// 🔗 Associations
LigneFacture.associate = (models) => {
    LigneFacture.belongsTo(models.Facture, {
        foreignKey: 'facture_id',
        as: 'facture'
    });
};

module.exports = LigneFacture;
