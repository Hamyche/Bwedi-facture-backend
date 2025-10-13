// middlewares/authorizeOwner.js
const models = require('../models'); // On importe tous les modèles
// Assure-toi que dans models/index.js tu exportes tous tes modèles

/**
 * Vérifie si l'utilisateur est propriétaire de la ressource
 * @param {string} modelName - Nom du modèle à vérifier ('Client', 'Facture', etc.)
 * @param {string} ownerField - Champ représentant le propriétaire ('user_id' ou 'structure_id')
 */
const authorizeOwner = (modelName, ownerField = 'user_id') => {
  return async (req, res, next) => {
    try {
      const Model = models[modelName];
      if (!Model) return res.status(500).json({ message: `Modèle ${modelName} introuvable` });

      const id = req.params.id; // L'id de la ressource dans l'URL
      const resource = await Model.findByPk(id);
      if (!resource) return res.status(404).json({ message: `${modelName} non trouvé` });

      // Vérification propriétaire
      if (resource[ownerField] !== req.user.id && resource[ownerField] !== req.user.structure_id) {
        return res.status(403).json({ message: 'Accès refusé : pas le propriétaire' });
      }

      next(); // Tout est ok
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur lors de l’autorisation' });
    }
  };
};

module.exports = authorizeOwner;
