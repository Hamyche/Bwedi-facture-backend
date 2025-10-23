// middlewares/errorMiddleware.js

// Middleware global pour gérer les erreurs
const errorHandler = (err, req, res, next) => {
    console.error('Erreur:', err.stack);

    // Si l'erreur a déjà un status, on l'utilise, sinon 500
    const statusCode = err.statusCode || 500;

    // Message d'erreur sécurisé
    let message = 'Une erreur est survenue sur le serveur';
    
    // Messages spécifiques selon le type d'erreur
    if (err.name === 'ValidationError') {
        message = 'Données invalides';
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        message = 'Cette ressource existe déjà';
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        message = 'Référence invalide';
    } else if (err.message && statusCode < 500) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;