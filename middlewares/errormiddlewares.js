// middlewares/errormiddleware.js

// 🔹 Middleware global pour gérer les erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log de l'erreur côté serveur pour le débogage

    // Si l'erreur a déjà un status, on l'utilise, sinon 500
    const statusCode = err.statusCode || 500;

    // On renvoie un message clair au client, sans exposer de détails sensibles
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Une erreur est survenue sur le serveur'
    });
};

module.exports = errorHandler;
