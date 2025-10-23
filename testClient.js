// testClients.js
require('dotenv').config();
const sequelize = require('./config/database');
const { User, Client } = require('./models');

const testClient = async () => {
  try {
    console.log('🧠 Connexion à la base de données...');
    await sequelize.authenticate();
    console.log('✅ Connecté à PostgreSQL via Sequelize');

    // Synchroniser les modèles (optionnel si déjà fait)
    await sequelize.sync({ alter: true });
    console.log('🔄 Synchronisation des modèles...');

    // Récupérer un utilisateur existant
    const user = await User.findOne({ where: { email: 'test@example.com' } });
    if (!user) {
      console.log('❌ Aucun utilisateur trouvé');
      return;
    }

    // Créer un client lié à cet utilisateur
    const client = await Client.create({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '0654321098',
      adresse: '123 Rue Exemple, Libreville',
       type_client: 'particulier', // <-- important
      nif: '123456789A',
      rccm: 'GA-LBV-2025-B-0001',
      tva: 'GA1234567',
      user_id: user.id
    });

    console.log('👤 Client créé :', client.toJSON());

    // Récupérer tous les clients de cet utilisateur
    const clients = await user.getClients();
    console.log(`📦 ${clients.length} client(s) trouvé(s) pour l'utilisateur ${user.nom} :`);
    clients.forEach(c => console.log(`- ${c.nom} ${c.prenom}`));

    await sequelize.close();
    console.log('🔒 Connexion fermée proprement.');
  } catch (error) {
    console.error('❌ Erreur de test :', error);
  }
};

testClient();
