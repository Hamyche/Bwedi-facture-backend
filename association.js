const User = require('./user');
const Structure = require('./structures');
const Category = require('./category');

// Relations entre User et Structure
User.hasMany(Structure, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Structure.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

// Relations entre Category et Structure
Category.hasMany(Structure, { foreignKey: 'categorie_id', onDelete: 'SET NULL' });
Structure.belongsTo(Category, { foreignKey: 'categorie_id', onDelete: 'SET NULL' });

// Relation entre Category et User
Category.hasMany(User, { foreignKey: 'category_id', onDelete: 'SET NULL' });
User.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'SET NULL' });

module.exports = { User, Structure, Category };
