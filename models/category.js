const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    nom: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    rules: { type: DataTypes.JSON, allowNull: false }, // <-- JSON des règles du formulaire
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// 🔹 Associations
Category.associate = (models) => {
    Category.hasMany(models.User, { foreignKey: 'category_id' });
    Category.hasMany(models.Structure, { foreignKey: 'category_id' });
    Category.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = Category;
