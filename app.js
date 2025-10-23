// ==========================================
// ✅ app.js — Configuration principale du backend
// ==========================================

// 🔹 Import des packages nécessaires
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit'); // 🔹 Ajouté pour limiter les requêtes sur /auth

// 🔹 Chargement des variables d'environnement (.env)
dotenv.config();

// 🔹 Initialisation de l'application Express
const app = express();

// ==========================================
// 🔹 Import des middlewares personnalisés
// ==========================================
const errorHandler = require('./middlewares/errormiddlewares');

// ==========================================
// 🔹 Import des routes
// ==========================================
const authRoutes = require('./routes/authRoutes'); // routes publiques : login / register
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const structureRoutes = require('./routes/structuresRoutes'); // ✅ corrigé : plural
const clientRoutes = require('./routes/clientRoutes');
const factureRoutes = require('./routes/factureRoutes');
const payementRoutes = require('./routes/payementRoutes');

const db = require('./models');       // Import des modèles
const seedCategory = require('./utils/seedCategory');

(async () => {
  try {
    // Connexion à la base
    await db.sequelize.authenticate();
    console.log('🗄️ Base de données connectée');

    // Synchronisation des tables
    await db.sequelize.sync({ alter: true });
    console.log('🔄 Tables synchronisées');

    // Initialisation des catégories
    await seedCategory();
  } catch (err) {
    console.error('❌ Erreur DB :', err);
  }
})();


// ==========================================
// 🔹 Middlewares globaux
// ==========================================

// Parsing du corps des requêtes JSON
app.use(express.json());

// Sécurisation des headers HTTP
app.use(helmet());

// 🔹 CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*', // 🔹 recommandé de limiter en prod
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔹 Rate limiting sur /api/auth pour protéger login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 requêtes max par IP
  message: "Trop de tentatives, réessaye plus tard"
});
app.use('/api/auth', authLimiter);

// ==========================================
// 🔹 Définition des routes
// ==========================================

// Routes publiques (auth uniquement)
app.use('/api/auth', authRoutes);

// Routes protégées (JWT vérifié dans chaque route)
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/structures', structureRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/payements', payementRoutes);

// ==========================================
// 🔹 Middleware global de gestion des erreurs
// ==========================================
app.use(errorHandler);

// ==========================================
// 🔹 Démarrage du serveur
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

// ==========================================
// ✅ Fin du fichier
// ==========================================
