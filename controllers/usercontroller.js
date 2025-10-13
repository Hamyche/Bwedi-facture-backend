// controllers/userController.js

const Category = require('../models/category');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 🔹 Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe, categorie, adresse, nationalite } = req.body;

        // Vérification des champs obligatoires
        if (!nom || !prenom || !email || !mot_de_passe || !categorie || !adresse) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        // Hasher le mot de passe pour la sécurité
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // Création de l'utilisateur
        const user = await User.create({
            nom,
            prenom,
            email,
            mot_de_passe: hashedPassword,
            categorie,
            adresse,
            nationalite // ✅ Champ ajouté
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Connexion utilisateur (login) et génération du token
exports.loginUser = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        if (!email || !mot_de_passe) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        // Vérifier que l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Vérifier le mot de passe
        const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

        // Générer le token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secretkey', // ⚡ Remplace 'secretkey' par une vraie clé en prod
            { expiresIn: '8h' }
        );

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const { nom, prenom, email, mot_de_passe, categorie, adresse, nationalite } = req.body;

        // Si mot de passe fourni, le hasher
        if (mot_de_passe) {
            req.body.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
        }

        // Mise à jour des champs
        await user.update({
            nom,
            prenom,
            email,
            categorie,
            adresse,
            nationalite,
            mot_de_passe: req.body.mot_de_passe
        });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        await user.destroy();
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
