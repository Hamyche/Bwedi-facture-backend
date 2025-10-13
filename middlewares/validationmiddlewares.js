// middlewares/validationMiddlewares.js

const { body, validationResult } = require('express-validator');

// 🔹 Middleware pour valider la création d'un utilisateur
exports.validateUser = [
    body('nom').notEmpty().withMessage('Le nom est requis'),
    body('prenom').notEmpty().withMessage('Le prénom est requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('categorie').notEmpty().withMessage('La catégorie est requise'),
    body('adresse').notEmpty().withMessage('L\'adresse est requise'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// 🔹 Middleware pour valider la connexion (login)
exports.validateLogin = [
    body('email').isEmail().withMessage('Email invalide'),
    body('mot_de_passe').notEmpty().withMessage('Le mot de passe est requis'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// 🔹 Middleware générique (corrige l’erreur “validate n’existe pas”)
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
