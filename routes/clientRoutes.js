const express = require('express'); 
const router = express.Router();
const { body, param } = require('express-validator');

const clientController = require('../controllers/clientcontroller');
const { authorizeOwner } = require('../middlewares/authorizeOwner');
const { validate } = require('../middlewares/validationmiddlewares');
const { verifyToken } = require('../middlewares/authmiddlewares');

// 🔹 Créer un client
router.post(
    '/',
    verifyToken,
    [
        body('nom').notEmpty().withMessage('Le nom est obligatoire'),
        body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
        body('telephone').notEmpty().withMessage('Le téléphone est obligatoire'),
        body('type_client')
            .notEmpty().withMessage('Le type_client est obligatoire')
            .isIn(['particulier', 'entreprise']).withMessage('type_client doit être particulier ou entreprise'),
        body('email').optional().isEmail().withMessage('Email invalide'),
        body('nif').optional().isString(),
        body('rccm').optional().isString(),
        body('tva').optional().isString()
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
    authorizeOwner('Client', 'user_id'),
    [
        param('id').isInt().withMessage('ID client invalide'),
        body('nom').optional().notEmpty().withMessage('Le nom ne peut pas être vide'),
        body('prenom').optional().notEmpty().withMessage('Le prénom ne peut pas être vide'),
        body('telephone').optional().notEmpty().withMessage('Le téléphone ne peut pas être vide'),
        body('type_client')
            .optional()
            .isIn(['particulier', 'entreprise']).withMessage('type_client doit être particulier ou entreprise'),
        body('email').optional().isEmail().withMessage('Email invalide'),
        body('nif').optional().isString(),
        body('rccm').optional().isString(),
        body('tva').optional().isString()
    ],
    validate,
    clientController.updateClient
);

// 🔹 Supprimer un client (propriétaire seulement)
router.delete(
    '/:id',
    verifyToken,
    authorizeOwner('Client', 'user_id'),
    [param('id').isInt().withMessage('ID client invalide')],
    validate,
    clientController.deleteClient
);

module.exports = router;
