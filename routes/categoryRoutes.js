const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const categoryController = require('../controllers/categoryController');
const authorizeOwner = require('../middlewares/authorizeOwner');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware'); // ✅ sécurité JWT
const Category = require('../models/category'); // ✅ nécessaire pour authorizeOwner

// 🔹 Créer une catégorie (auth + validation)
router.post(
    '/',
    verifyToken,
    [body('nom').notEmpty().withMessage('Le nom est obligatoire')],
    validate,
    categoryController.createCategory
);

// 🔹 Récupérer toutes les catégories
router.get('/', verifyToken, categoryController.getAllCategories);

// 🔹 Récupérer une catégorie par ID
router.get(
    '/:id',
    verifyToken,
    [param('id').isInt().withMessage('ID invalide')],
    validate,
    categoryController.getCategoryById
);

// 🔹 Mettre à jour une catégorie (propriétaire seulement)
router.put(
    '/:id',
    verifyToken,
    authorizeOwner(Category, 'user_id'), // ✅ vérification propriétaire
    [
        param('id').isInt().withMessage('ID invalide'),
        body('nom').optional().notEmpty().withMessage('Nom invalide')
    ],
    validate,
    categoryController.updateCategory
);

// 🔹 Supprimer une catégorie (propriétaire seulement)
router.delete(
    '/:id',
    verifyToken,
    authorizeOwner(Category, 'user_id'), // ✅ vérification propriétaire
    [param('id').isInt().withMessage('ID invalide')],
    validate,
    categoryController.deleteCategory
);

module.exports = router;
