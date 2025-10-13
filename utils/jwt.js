const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15 min';

/**
 * Génère un token JWT pour un utilisateur
 * @param {Object} payload - Les infos à inclure dans le token (ex: id, email)
 * @returns {string} - Le token JWT
 */
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Vérifie un token JWT et retourne le payload
 * @param {string} token - Le token à vérifier
 * @returns {Object} - Le payload décodé
 * @throws {Error} - Si le token est invalide ou expiré
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signToken, verifyToken };
