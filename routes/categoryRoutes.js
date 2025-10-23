const express = require('express');
const router = express.Router();
const { param } = require('express-validator');

const categoryController = require('../controllers/categorycontroller'); // ⚠️ respecter la casse actuelle
const { validate } = require('../middlewares/validationMiddlewares');
const { verifyToken } = require('../middlewares/authMiddlewares');

// 🔹 Récupérer toutes les catégories
router.get('/', verifyToken, categoryController.getAllCategories);

// 🔹 Récupérer seulement les catégories prédéfinies (pour le tableau de bord front)
router.get('/predefined', verifyToken, categoryController.getPredefinedCategories);

// 🔹 Récupérer une catégorie par ID
router.get(
    '/:id',
    verifyToken,
    [param('id').isInt().withMessage('ID invalide')],
    validate,
    categoryController.getCategoryById
);

module.exports = router;
