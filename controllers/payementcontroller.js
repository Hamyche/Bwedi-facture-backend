const Payement = require('../models/payement');
const Facture = require('../models/facture');
const User = require('../models/user');

// 🔹 Créer un paiement
exports.createPayement = async (req, res) => {
    try {
        const { montant, date, facture_id, user_id, mode } = req.body;

        if (!montant || !date || !facture_id || !user_id || !mode) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        const payement = await Payement.create({ montant, date, facture_id, user_id, mode });
        res.status(201).json(payement);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer tous les paiements
exports.getAllPayements = async (req, res) => {
    try {
        const payements = await Payement.findAll({ include: [Facture, User] });
        res.status(200).json(payements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer un paiement par ID
exports.getPayementById = async (req, res) => {
    try {
        const payement = await Payement.findByPk(req.params.id, { include: [Facture, User] });
        if (!payement) return res.status(404).json({ message: "Paiement non trouvé" });
        res.status(200).json(payement);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Mettre à jour un paiement
exports.updatePayement = async (req, res) => {
    try {
        const payement = await Payement.findByPk(req.params.id);
        if (!payement) return res.status(404).json({ message: "Paiement non trouvé" });

        await payement.update(req.body);
        res.status(200).json(payement);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Supprimer un paiement
exports.deletePayement = async (req, res) => {
    try {
        const payement = await Payement.findByPk(req.params.id);
        if (!payement) return res.status(404).json({ message: "Paiement non trouvé" });

        await payement.destroy();
        res.status(200).json({ message: "Paiement supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
