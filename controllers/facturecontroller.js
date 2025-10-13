const Facture = require('../models/facture');
const Client = require('../models/client');
const User = require('../models/user');

// 🔹 Créer une facture
exports.createFacture = async (req, res) => {
    try {
        const { numero, montant, date, client_id, user_id, statut } = req.body;

        if (!numero || !montant || !date || !client_id || !user_id) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        const facture = await Facture.create({ numero, montant, date, client_id, user_id, statut });
        res.status(201).json(facture);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer toutes les factures
exports.getAllFactures = async (req, res) => {
    try {
        const factures = await Facture.findAll({ include: [Client, User] });
        res.status(200).json(factures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer une facture par ID
exports.getFactureById = async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id, { include: [Client, User] });
        if (!facture) return res.status(404).json({ message: "Facture non trouvée" });
        res.status(200).json(facture);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Mettre à jour une facture
exports.updateFacture = async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id);
        if (!facture) return res.status(404).json({ message: "Facture non trouvée" });

        await facture.update(req.body);
        res.status(200).json(facture);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Supprimer une facture
exports.deleteFacture = async (req, res) => {
    try {
        const facture = await Facture.findByPk(req.params.id);
        if (!facture) return res.status(404).json({ message: "Facture non trouvée" });

        await facture.destroy();
        res.status(200).json({ message: "Facture supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
