// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit'); // ✅ Protection brute force

const userController = require('../controllers/usercontroller');
const { validate } = require('../middlewares/validationmiddlewares');

// ==========================================
// 🔹 Configuration du rate limiter pour /login
// ==========================================
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 tentatives max par IP
    message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

// ==========================================
// 🔹 Route de connexion utilisateur
// ==========================================
router.post(
    '/login',
    loginLimiter, // ✅ Protection contre le brute force
    [
        body('email').isEmail().withMessage('Email invalide'),
        body('mot_de_passe').notEmpty().withMessage('Mot de passe requis')
    ],
    validate, // Vérifie les erreurs de validation
    userController.loginUser // Contrôleur de connexion + génération du token JWT
);

// ==========================================
// 🔹 Route d'inscription utilisateur (optionnelle)
// ==========================================
router.post(
    '/register',
    [
        body('nom').notEmpty().withMessage('Nom obligatoire'),
        body('prenom').notEmpty().withMessage('Prénom obligatoire'),
        body('email').isEmail().withMessage('Email invalide'),
        body('mot_de_passe').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
        body('categorie').notEmpty().withMessage('Catégorie obligatoire'),
        body('adresse').notEmpty().withMessage('Adresse obligatoire')
    ],
    validate,
    userController.createUser // Création d'un nouvel utilisateur
);

module.exports = router;
