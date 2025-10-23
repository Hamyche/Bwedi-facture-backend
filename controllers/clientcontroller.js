const { Op } = require('sequelize');
const Client = require('../models/client');
const Facture = require('../models/facture');
const User = require('../models/user');

// 🔹 Créer un client
exports.createClient = async (req, res) => {
    try {
        const { nom, prenom, email, telephone, type_client, nif, rccm, tva } = req.body;
        const user_id = req.user.id; // utilisateur connecté

        // Validation des champs obligatoires
        if (!nom || !prenom || !telephone || !type_client) {
            return res.status(400).json({ message: "Nom, prénom téléphone et type_client sont obligatoires" });
        }

        // Validation entreprise
        if (type_client === 'entreprise' && (!nif || !rccm)) {
            return res.status(400).json({ message: "NIF et RCCM sont obligatoires pour les entreprises" });
        }

        const client = await Client.create({
            nom,
            prenom,
            email,
            telephone,
            type_client: type_client || 'particulier',
            nif: nif || null,
            rccm: rccm || null,
            tva: tva || null,
            user_id
        });

        res.status(201).json(client);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la création du client" });
    }
};

// 🔹 Récupérer tous les clients avec recherche et tri
exports.getAllClients = async (req, res) => {
    try {
        const { search, sort } = req.query;
        const user_id = req.user.id;

        let where = { user_id };
        if (search) where.nom = { [Op.iLike]: `%${search}%` };

        const clients = await Client.findAll({
            where,
            order: [['nom', sort === 'desc' ? 'DESC' : 'ASC']],
            include: { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
        });

        res.status(200).json(clients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors du chargement des clients" });
    }
};

// 🔹 Récupérer un client par ID
exports.getClientById = async (req, res) => {
    try {
        const user_id = req.user.id;
        const client = await Client.findOne({
            where: { id: req.params.id, user_id },
            include: { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
        });

        if (!client) return res.status(404).json({ message: "Client non trouvé" });
        res.status(200).json(client);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération du client" });
    }
};

// 🔹 Mettre à jour un client
exports.updateClient = async (req, res) => {
    try {
        const user_id = req.user.id;
        const client = await Client.findOne({ where: { id: req.params.id, user_id } });

        if (!client) return res.status(404).json({ message: "Client non trouvé" });

        // Si entreprise, vérifier NIF/RCCM
        if (req.body.type_client === 'entreprise' && (!req.body.nif || !req.body.rccm)) {
            return res.status(400).json({ message: "NIF et RCCM obligatoires pour les entreprises" });
        }

        await client.update(req.body);
        res.status(200).json({ message: "Client mis à jour avec succès", client });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la mise à jour du client" });
    }
};

// 🔹 Supprimer un client (uniquement s’il n’a pas de factures)
exports.deleteClient = async (req, res) => {
    try {
        const user_id = req.user.id;
        const client = await Client.findOne({
            where: { id: req.params.id, user_id },
            include: { model: Facture, as: 'factures' }
        });

        if (!client) return res.status(404).json({ message: "Client non trouvé" });
        if (client.factures.length > 0) {
            return res.status(400).json({ message: "Impossible de supprimer : ce client a des factures" });
        }

        await client.destroy();
        res.status(200).json({ message: "Client supprimé avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la suppression du client" });
    }
};
