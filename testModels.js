// testModels.js

require('dotenv').config();
const sequelize = require('./config/database'); // ton fichier de config Sequelize
const { User, Client, Facture, Category, Structure, Payement } = require('./models');

(async () => {
  try {
    console.log('🧠 Test de connexion à la base de données...');
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à PostgreSQL !');

    console.log('🔄 Synchronisation des modèles...');
    await sequelize.sync({ force: false }); // ⚠️ force:true = recrée les tables
    console.log('✅ Synchronisation réussie !');

    // Test simple : création d'un utilisateur
    const user = await User.create({
      nom: 'Test',
      prenom: 'Utilisateur',
      email: 'test@example.com',
      mot_de_passe: '12345678',
      categorie: 'PME',
      adresse: 'Libreville'
    });

    console.log('👤 Utilisateur créé :', user.toJSON());

    // Test lecture
    const users = await User.findAll();
    console.log(`📦 ${users.length} utilisateur(s) trouvé(s) :`);
    users.forEach(u => console.log(`- ${u.nom} ${u.prenom}`));

    await sequelize.close();
    console.log('🔒 Connexion fermée proprement.');
  } catch (error) {
    console.error('❌ Erreur de test :', error);
  }
})();
