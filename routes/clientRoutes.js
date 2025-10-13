const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const clientController = require('../controllers/clientController');
const authorizeOwner = require('../middlewares/authorizeOwner');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware'); // ✅ JWT
const Client = require('../models/client'); // ✅ nécessaire pour authorizeOwner

// 🔹 Créer un client
router.post(
    '/',
    verifyToken,
    [
        body('nom').notEmpty().withMessage('Le nom est obligatoire'),
        body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
        body('email').isEmail().withMessage('Email invalide'),
        body('telephone').optional().isString().withMessage('Téléphone invalide'),
        body('user_id').optional().isInt().withMessage('ID utilisateur invalide')
    ],
    validate,
    clientController.createClient
);

// 🔹 Récupérer tous les clients
router.get('/', verifyToken, clientController.getAllClients);

// 🔹 Récupérer un client par ID
router.get(
    '/:id',
    verifyToken,
    [param('id').isInt().withMessage('ID client invalide')],
    validate,
    clientController.getClientById
);

// 🔹 Mettre à jour un client (propriétaire seulement)
router.put(
    '/:id',
    verifyToken,
    authorizeOwner(Client, 'user_id'), // ✅ vérification propriétaire
    [
        param('id').isInt().withMessage('ID client invalide'),
        body('email').optional().isEmail().withMessage('Email invalide'),
        body('telephone').optional().isString().withMessage('Téléphone invalide')
    ],
    validate,
    clientController.updateClient
);

// 🔹 Supprimer un client (propriétaire seulement)
router.delete(
    '/:id',
    verifyToken,
    authorizeOwner(Client, 'user_id'), // ✅ vérification propriétaire
    [param('id').isInt().withMessage('ID client invalide')],
    validate,
    clientController.deleteClient
);

module.exports = router;
