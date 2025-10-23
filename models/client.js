const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: true },
  telephone: { type: DataTypes.STRING, allowNull: false },
  adresse: { type: DataTypes.TEXT, allowNull: true },

  type_client: {
    type: DataTypes.ENUM('particulier', 'entreprise'),
    allowNull: false,
    defaultValue: 'particulier'
  },

  nif: { type: DataTypes.STRING, unique: true, allowNull: true },
  rccm: { type: DataTypes.STRING, unique: true, allowNull: true },
  tva: { type: DataTypes.STRING, unique: true, allowNull: true },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'clients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// 🔹 Associations
Client.associate = (models) => {
  Client.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  Client.hasMany(models.Facture, { foreignKey: 'client_id', as: 'factures' });
};

module.exports = Client;
