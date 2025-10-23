// models/Facture.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facture = sequelize.define('Facture', {
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    designation: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    montant_ht: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    montant_ttc: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    livraison: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    cout_livraison: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    statut: {
        type: DataTypes.ENUM('payé', 'partiel', 'impayé'),
        defaultValue: 'impayé'
    },
    echeance: {
        type: DataTypes.DATE,
        allowNull: true // Renseignée uniquement si statut = 'partiel'
    },
    signature: {
        type: DataTypes.TEXT
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' }
    }
}, {
    tableName: 'factures',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// 🔗 Associations
Facture.associate = (models) => {
    // Créateur de la facture
    Facture.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    // Client concerné
    Facture.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });

    // Lignes détaillant les produits ou services
    Facture.hasMany(models.LigneFacture, { foreignKey: 'facture_id', as: 'lignes' });

    // Suivi des payements (audit + changements de statut)
    Facture.hasMany(models.Payement, { foreignKey: 'facture_id', as: 'payements' });
};

module.exports = Facture;
