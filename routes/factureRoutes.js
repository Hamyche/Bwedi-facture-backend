const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const factureController = require('../controllers/factureController');
const authorizeOwner = require('../middlewares/authorizeOwner');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const Facture = require('../models/facture'); // ✅ nécessaire pour authorizeOwner

// 🔹 Créer une facture
router.post(
    '/',
    verifyToken,
    [
        body('numero').notEmpty().withMessage('Le numéro de facture est obligatoire'),
        body('montant').isFloat({ gt: 0 }).withMessage('Montant invalide'),
        body('date').isISO8601().withMessage('Date invalide'),
        body('client_id').isInt().withMessage('ID client invalide'),
        body('user_id').isInt().withMessage('ID utilisateur invalide')
    ],
    validate,
    factureController.createFacture
);

// 🔹 Récupérer toutes les factures
router.get('/', verifyToken, factureController.getAllFactures);

// 🔹 Récupérer une facture par ID
router.get(
    '/:id',
    verifyToken,
    [param('id').isInt().withMessage('ID facture invalide')],
    validate,
    factureController.getFactureById
);

// 🔹 Mettre à jour une facture (propriétaire seulement)
router.put(
    '/:id',
    verifyToken,
    authorizeOwner(Facture, 'user_id'), // ✅ vérification propriétaire
    [
        param('id').isInt().withMessage('ID facture invalide'),
        body('montant').optional().isFloat({ gt: 0 }).withMessage('Montant invalide'),
        body('statut').optional().isString().withMessage('Statut invalide')
    ],
    validate,
    factureController.updateFacture
);

// 🔹 Supprimer une facture (propriétaire seulement)
router.delete(
    '/:id',
    verifyToken,
    authorizeOwner(Facture, 'user_id'), // ✅ vérification propriétaire
    [param('id').isInt().withMessage('ID facture invalide')],
    validate,
    factureController.deleteFacture
);

module.exports = router;
