const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const userController = require('../controllers/usercontroller');
const authorizeOwner = require('../middlewares/authorizeOwner');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const User = require('../models/user'); // ✅ nécessaire pour authorizeOwner

// 🔹 Créer un nouvel utilisateur
router.post(
    '/',
    [
        body('nom').notEmpty().withMessage('Le nom est obligatoire'),
        body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
        body('email').isEmail().withMessage('Email invalide'),
        body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
        body('categorie').notEmpty().withMessage('La catégorie est obligatoire'),
        body('adresse').notEmpty().withMessage('L\'adresse est obligatoire')
    ],
    validate,
    userController.createUser
);

// 🚫 Route /login supprimée ici (elle doit être dans routes/authRoutes.js)

// 🔹 Récupérer tous les utilisateurs
router.get('/', verifyToken, userController.getAllUsers);

// 🔹 Récupérer un utilisateur par ID
router.get(
    '/:id',
    verifyToken,
    [param('id').isInt().withMessage('ID invalide')],
    validate,
    userController.getUserById
);

// 🔹 Mettre à jour un utilisateur (propriétaire seulement)
router.put(
    '/:id',
    verifyToken,
    authorizeOwner(User, 'id'), // ✅ vérification propriétaire
    [
        param('id').isInt().withMessage('ID invalide'),
        body('email').optional().isEmail().withMessage('Email invalide'),
        body('mot_de_passe').optional().isLength({ min: 6 }).withMessage('Mot de passe trop court')
    ],
    validate,
    userController.updateUser
);

// 🔹 Supprimer un utilisateur (propriétaire seulement)
router.delete(
    '/:id',
    verifyToken,
    authorizeOwner(User, 'id'), // ✅ vérification propriétaire
    [param('id').isInt().withMessage('ID invalide')],
    validate,
    userController.deleteUser
);

module.exports = router;
