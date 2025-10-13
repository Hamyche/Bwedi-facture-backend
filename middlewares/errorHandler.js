// middlewares/errorHandler.js

// Middleware centralisé de gestion des erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err); // ✅ On logue l'erreur complète côté serveur pour debug

    // Structure de base pour le client
    const statusCode = err.statusCode || 500; // 500 = erreur serveur par défaut
    const message = err.message || 'Une erreur est survenue';

    // On renvoie seulement les infos nécessaires sans exposer la DB
    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;
