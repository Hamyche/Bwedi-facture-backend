const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    nom: { type: DataTypes.STRING(100), allowNull: false },
    prenom: { type: DataTypes.STRING(100), allowNull: false },
    nationalite: { type: DataTypes.STRING(100) },
    adresse: { type: DataTypes.TEXT, allowNull: false },
    email: { 
        type: DataTypes.STRING(150), 
        allowNull: false, 
        unique: true, 
        validate: { isEmail: true } 
    },
    mot_de_passe: { type: DataTypes.TEXT, allowNull: false },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// 🔹 Associations
User.associate = (models) => {
    User.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    User.hasMany(models.Client, { foreignKey: 'user_id' });
    User.hasMany(models.Structure, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(models.Facture, { foreignKey: 'user_id' });
    User.hasMany(models.Payement, { foreignKey: 'user_id' });
};

module.exports = User;
