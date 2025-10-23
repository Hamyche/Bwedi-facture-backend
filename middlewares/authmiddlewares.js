// middlewares/authMiddlewares.js

const { verifyToken: verifyJWT } = require('../utils/jwt');
const User = require('../models/user');

// 🔹 Middleware pour vérifier le token JWT
const verifyToken = async (req, res, next) => {
    try {
        // Récupérer le token depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token manquant ou mal formaté' });
        }

        const token = authHeader.split(' ')[1];

        // Vérifier le token avec la fonction utilitaire
        const decoded = verifyJWT(token);

        // Récupérer l'utilisateur associé
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        // Stocker l'utilisateur dans req pour les routes suivantes
        req.user = user;

        next();
    } catch (err) {
        console.error('Erreur authentification:', err.message);
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};

module.exports = { verifyToken };
