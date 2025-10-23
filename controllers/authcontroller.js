// controllers/authController.js

const User = require('../models/user');
const Structure = require('../models/structures');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

// 🔹 Login utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    // Générer le JWT
    const token = generateToken({ id: user.id, email: user.email });

    // Vérifier si l'utilisateur a déjà une structure
    const structure = await Structure.findOne({ where: { user_id: user.id } });

    // Déterminer la redirection selon la première ou énième connexion
    const redirectTo = structure ? '/dashboard' : '/categories';

    // Réponse
    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email },
      redirectTo
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 🔹 Inscription utilisateur (si tu as besoin d'un signup)
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({ email, password: hashedPassword, name });

    // Générer le JWT
    const token = generateToken({ id: user.id, email: user.email });

    // Première connexion → redirection vers les catégories
    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email },
      redirectTo: '/categories'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
