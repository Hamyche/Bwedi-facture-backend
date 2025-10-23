// testCategories.js
const db = require('./models');
const Category = require('./models/category');

const showCategories = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('🗄️ Base de données connectée');

        const categories = await Category.findAll({
            attributes: ['id', 'nom', 'description'],
            order: [['id', 'ASC']]
        });

        console.log('📂 Toutes les catégories :');
        categories.forEach(cat => {
            console.log(`${cat.id} | ${cat.nom} | ${cat.description}`);
        });

        process.exit(0); // quitte le script
    } catch (err) {
        console.error('❌ Erreur :', err);
        process.exit(1);
    }
};

showCategories();
