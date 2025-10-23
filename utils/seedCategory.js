const Category = require('../models/category'); // ✅ ton modèle Sequelize

// ✅ Catégories prédéfinies
const predefinedCategories = [
  { nom: 'Indépendant', description: 'Un freelance travaillant seul au Gabon' },
  { nom: 'Commerçant', description: 'Boutique ou magasin vendant des produits' },
  { nom: 'Artisan', description: 'Menuisier, cordonnier ou tailleur local' },
  { nom: 'PME', description: 'Petite entreprise employant moins de 100 personnes, petite usine' },
  { nom: 'Grande Entreprise', description: 'Société nationale pétrolière, grande entreprise' },
  { nom: 'Prestataire de services', description: 'Société de services, agence digitale ou consultant indépendant' }
];

// ✅ Fonction de seed
const seedCategories = async () => {
  for (const cat of predefinedCategories) {
    const [category, created] = await Category.findOrCreate({ // ⚠️ changé 'Category' en 'category' ici
      where: { nom: cat.nom },
      defaults: cat
    });
    if (created) console.log(`📂 Catégorie créée : ${cat.nom}`);
  }
};

module.exports = seedCategories;
