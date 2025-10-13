// ==========================================
// ✅ app.js — Configuration principale du backend
// ==========================================

// 🔹 Import des packages nécessaires
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// 🔹 Chargement des variables d'environnement (.env)
dotenv.config();

// 🔹 Initialisation de l'application Express
const app = express();

// ==========================================
// 🔹 Import des middlewares personnalisés
// ==========================================
const errorHandler = require('./middlewares/errorHandler');

// ==========================================
// 🔹 Import des routes
// ==========================================
const authRoutes = require('./routes/authRoutes'); // routes publiques : login / register
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const structureRoutes = require('./routes/structureRoutes');
const clientRoutes = require('./routes/clientRoutes');
const factureRoutes = require('./routes/factureRoutes');
const payementRoutes = require('./routes/payementRoutes');

// ==========================================
// 🔹 Middlewares globaux
// ==========================================

// Autoriser le CORS (accès depuis ton appli mobile ou front)
app.use(cors({
    origin: '*', // tu peux restreindre ici avec ton domaine plus tard
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Sécurisation des headers HTTP
app.use(helmet());

// Parsing du corps des requêtes JSON
app.use(express.json());

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
