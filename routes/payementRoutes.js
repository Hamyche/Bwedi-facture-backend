const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const payementController = require('../controllers/payementController');
const authorizeOwner = require('../middlewares/authorizeOwner');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const Payement = require('../models/payement'); // ✅ nécessaire pour authorizeOwner

// 🔹 Créer un paiement
router.post(
    '/',
    verifyToken,
    [
        body('montant').isFloat({ gt: 0 }).withMessage('Montant invalide'),
        body('date').isISO8601().withMessage('Date invalide'),
        body('facture_id').isInt().withMessage('ID facture invalide'),
        body('user_id').isInt().withMessage('ID utilisateur invalide'),
        body('mode').notEmpty().withMessage('Mode de paiement obligatoire')
    ],
    validate,
    payementController.createPayement
);

// 🔹 Récupérer tous les paiements
router.get('/', verifyToken, payementController.getAllPayements);

// 🔹 Récupérer un paiement par ID
router.get(
    '/:id',
    verifyToken,
    [param('id').isInt().withMessage('ID paiement invalide')],
    validate,
    payementController.getPayementById
);

// 🔹 Mettre à jour un paiement (propriétaire seulement)
router.put(
    '/:id',
    verifyToken,
    authorizeOwner(Payement, 'user_id'), // ✅ vérification propriétaire
    [
        param('id').isInt().withMessage('ID paiement invalide'),
        body('montant').optional().isFloat({ gt: 0 }).withMessage('Montant invalide'),
        body('mode').optional().isString().withMessage('Mode invalide')
    ],
    validate,
    payementController.updatePayement
);

// 🔹 Supprimer un paiement (propriétaire seulement)
router.delete(
    '/:id',
    verifyToken,
    authorizeOwner(Payement, 'user_id'), // ✅ vérification propriétaire
    [param('id').isInt().withMessage('ID paiement invalide')],
    validate,
    payementController.deletePayement
);

module.exports = router;
