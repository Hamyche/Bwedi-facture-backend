// middlewares/authMiddleware.js
const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Token manquant, accès refusé' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token manquant, accès refusé' });
    }

    // ✅ Utilisation de l'utilitaire
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = authMiddleware;
