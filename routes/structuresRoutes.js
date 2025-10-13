const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const structureController = require('../controllers/structureController');
const authorizeOwner = require('../middlewares/authorizeOwner');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const Structure = require('../models/structure'); // ✅ nécessaire pour authorizeOwner

// 🔹 Créer une structure
router.post(
    '/',
    verifyToken,
    [
        body('nom_structure').notEmpty().withMessage('Nom de la structure obligatoire'),
        body('adresse').notEmpty().withMessage('Adresse obligatoire'),
        body('user_id').isInt().withMessage('ID utilisateur invalide'),
        body('categorie_id').isInt().withMessage('ID catégorie invalide')
    ],
    validate,
    structureController.createStructure
);

// 🔹 Récupérer toutes les structures
router.get('/', verifyToken, structureController.getAllStructures);

// 🔹 Récupérer une structure par ID
router.get(
    '/:id',
    verifyToken,
    [param('id').isInt().withMessage('ID invalide')],
    validate,
    structureController.getStructureById
);

// 🔹 Mettre à jour une structure (propriétaire seulement)
router.put(
    '/:id',
    verifyToken,
    authorizeOwner(Structure, 'user_id'), // ✅ vérification propriétaire
    [
        param('id').isInt().withMessage('ID invalide'),
        body('categorie_id').optional().isInt().withMessage('ID catégorie invalide')
    ],
    validate,
    structureController.updateStructure
);

// 🔹 Supprimer une structure (propriétaire seulement)
router.delete(
    '/:id',
    verifyToken,
    authorizeOwner(Structure, 'user_id'), // ✅ vérification propriétaire
    [param('id').isInt().withMessage('ID invalide')],
    validate,
    structureController.deleteStructure
);

module.exports = router;
