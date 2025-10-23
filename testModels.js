// testModels.js
require('dotenv').config();
const sequelize = require('./config/database');
const { User, Client, Facture, Category, Structure, Payement } = require('./models');

(async () => {
  try {
    console.log('🧠 Test de connexion à la base de données...');
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à PostgreSQL !');

    console.log('🔄 Synchronisation des modèles...');
    await sequelize.sync({ force: true }); // ⚠️ force:true = recrée les tables
    console.log('✅ Synchronisation réussie !');

    // =========================
    // Création des catégories
    // =========================
    const category = await Category.create({ nom: 'PME', description: 'Catégorie de test' });
    console.log('📂 Catégorie créée :', category.toJSON());

    // =========================
    // Création d’un utilisateur
    // =========================
    const user = await User.create({
      nom: 'Marlonne',
      prenom: 'Mackoukou',
      email: 'test@example.com',
      mot_de_passe: '12345678',
      adresse: 'Libreville',
      category_id: category.id
    });
    console.log('👤 Utilisateur créé :', user.toJSON());

    // =========================
    // Création d’une structure
    // =========================
    const structure = await Structure.create({
      nom_structure: 'Structure Test',
      adresse: 'Libreville',
      user_id: user.id,
      category_id: category.id
    });
    console.log('🏢 Structure créée :', structure.toJSON());

    // =========================
    // Création d’un client
    // =========================
    const client = await Client.create({
      nom: 'ClientTest',
      prenom: 'Testeur',
      email: 'client@test.com',
      adresse: 'Libreville',
      user_id: user.id
    });
    console.log('👥 Client créé :', client.toJSON());

    // =========================
    // Création d’une facture
    // =========================
    const facture = await Facture.create({
      numero: 'FAC-001',
      designation: 'Test Facture',
      montant_ht: 1000,
      montant_ttc: 1200,
      user_id: user.id,
      client_id: client.id
    });
    console.log('🧾 Facture créée :', facture.toJSON());

    // =========================
    // Création d’un paiement
    // =========================
    const payement = await Payement.create({
      montant: 1200,
      mode: 'Cash',
      facture_id: facture.id,
      user_id: user.id
    });
    console.log('💰 Paiement créé :', payement.toJSON());

    // =========================
    // Lecture et vérification des relations
    // =========================
    const users = await User.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Client },
        { model: Structure },
        { model: Facture },
        { model: Payement }
      ]
    });

    console.log(`\n📦 ${users.length} utilisateur(s) avec leurs associations :`);
    users.forEach(u => {
      console.log(`- ${u.nom} ${u.prenom}`);
      console.log('  Catégorie:', u.category?.nom);
      console.log('  Clients:', u.Clients?.length || 0);
      console.log('  Structures:', u.Structures?.length || 0);
      console.log('  Factures:', u.Factures?.length || 0);
      console.log('  Paiements:', u.Payements?.length || 0);
    });

    await sequelize.close();
    console.log('🔒 Connexion fermée proprement.');
  } catch (error) {
    console.error('❌ Erreur de test :', error);
  }
})();
