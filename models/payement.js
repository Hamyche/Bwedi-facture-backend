const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payement = sequelize.define('Payement', {
    montant: { 
        type: DataTypes.FLOAT, 
        allowNull: false,
        comment: 'Montant du paiement'
    },
    mode: { 
        type: DataTypes.ENUM('espèce', 'mobile_money'), 
        allowNull: false, 
        defaultValue: 'espèce',
        comment: 'Mode de paiement'
    },
    statut: {
        type: DataTypes.ENUM('impayé', 'partiel', 'complet'),
        allowNull: false,
        defaultValue: 'impayé',
        comment: 'Statut du paiement'
    },
    date_payement: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    echeance: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Date limite si paiement partiel'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    facture_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'factures', key: 'id' }
    }
}, {
    tableName: 'payements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// 🔹 Associations
Payement.associate = (models) => {
    Payement.belongsTo(models.User, { foreignKey: 'user_id' });
    Payement.belongsTo(models.Facture, { foreignKey: 'facture_id' });
};

module.exports = Payement;
