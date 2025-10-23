const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Structure = sequelize.define('Structure', {
    nom_structure: { type: DataTypes.STRING(150), allowNull: false },
    adresse: { type: DataTypes.TEXT, allowNull: false },
    boite_postale: { type: DataTypes.STRING(50) },
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
    assujetti: { type: DataTypes.BOOLEAN, defaultValue: false },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    tableName: 'structures',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// 🔹 Associations
Structure.associate = (models) => {
    Structure.belongsTo(models.User, { foreignKey: 'user_id' });
    Structure.belongsTo(models.Category, { foreignKey: 'category_id' });
};

module.exports = Structure;
