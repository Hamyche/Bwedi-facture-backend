const Client = require('../models/client');
const User = require('../models/user'); // si tu veux relier à l'utilisateur

// 🔹 Créer un client
exports.createClient = async (req, res) => {
    try {
        const { nom, prenom, email, telephone, user_id } = req.body;

        // Validation des champs obligatoires
        if (!nom || !prenom || !email) {
            return res.status(400).json({ message: "Nom, prénom et email sont obligatoires" });
        }

        const client = await Client.create({ nom, prenom, email, telephone, user_id });
        res.status(201).json(client);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer tous les clients
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll({ include: User });
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer un client par ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id, { include: User });
        if (!client) return res.status(404).json({ message: "Client non trouvé" });
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Mettre à jour un client
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: "Client non trouvé" });

        await client.update(req.body);
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Supprimer un client
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) return res.status(404).json({ message: "Client non trouvé" });

        await client.destroy();
        res.status(200).json({ message: "Client supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
