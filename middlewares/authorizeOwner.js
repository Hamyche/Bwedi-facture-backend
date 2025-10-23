// middlewares/authorizeOwner.js
const models = require('../models');

/**
 * Vérifie si l'utilisateur est propriétaire de la ressource
 * @param {string} modelName - Nom du modèle à vérifier ('Client', 'Facture', etc.)
 * @param {string} ownerField - Champ représentant le propriétaire ('user_id' ou 'structure_id')
 */
const authorizeOwner = (modelName, ownerField = 'user_id') => {
  return async (req, res, next) => {
    try {
      // Vérifier que l'utilisateur est authentifié
      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
      }

      const Model = models[modelName];
      if (!Model) {
        return res.status(500).json({ message: `Modèle ${modelName} introuvable` });
      }

      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ message: 'ID de ressource manquant' });
      }

      const resource = await Model.findByPk(id);
      if (!resource) {
        return res.status(404).json({ message: `${modelName} non trouvé` });
      }

      // Vérification propriétaire stricte (conversion en nombre pour éviter les erreurs de type)
      if (Number(resource[ownerField]) !== Number(req.user.id)) {
        return res.status(403).json({ message: 'Accès refusé : vous n\'êtes pas le propriétaire' });
      }

      // Stocker la ressource pour éviter une nouvelle requête
      req.resource = resource;
      next();
    } catch (err) {
      console.error('Erreur autorisation:', err);
      res.status(500).json({ message: 'Erreur serveur lors de l\'autorisation' });
    }
  };
};

module.exports = { authorizeOwner };
