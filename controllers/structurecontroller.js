// controllers/structureController.js

const Structure = require('../models/structures');
const User = require('../models/user');
const Category = require('../models/category');

// 🔹 Créer une nouvelle structure
exports.createStructure = async (req, res) => {
    try {
        const {
            nom_structure, adresse, telephone, email,
            numero_nif, numero_rccm, numero_tva,
            tva, css, tps, forme_juridique,
            site_web, reseaux_sociaux, assujetti,
            user_id, categorie_id
        } = req.body;

        // Vérification des champs obligatoires généraux
        if (!nom_structure || !adresse || !user_id || !categorie_id) {
            return res.status(400).json({ message: "Nom, adresse, utilisateur et catégorie obligatoires" });
        }

        // Règles de gestion : PME et Grande entreprise doivent avoir NIF, RCCM, TVA
        const category = await Category.findByPk(categorie_id);
        if (category && (category.nom === 'PME' || category.nom === 'Grande entreprise')) {
            if (!numero_nif || !numero_rccm || !numero_tva) {
                return res.status(400).json({
                    message: "Pour les PME et Grandes entreprises, NIF, RCCM et TVA sont obligatoires"
                });
            }
            // Forme juridique obligatoire pour grande entreprise
            if (category.nom === 'Grande entreprise' && !forme_juridique) {
                return res.status(400).json({ message: "Forme juridique obligatoire pour Grande entreprise" });
            }
        }

        const structure = await Structure.create({
            nom_structure, adresse, telephone, email,
            numero_nif, numero_rccm, numero_tva,
            tva, css, tps, forme_juridique,
            site_web, reseaux_sociaux, assujetti,
            user_id, categorie_id
        });

        res.status(201).json(structure);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer toutes les structures
exports.getAllStructures = async (req, res) => {
    try {
        const structures = await Structure.findAll({ include: [User, Category] });
        res.status(200).json(structures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer une structure par ID
exports.getStructureById = async (req, res) => {
    try {
        const structure = await Structure.findByPk(req.params.id, { include: [User, Category] });
        if (!structure) return res.status(404).json({ message: "Structure non trouvée" });
        res.status(200).json(structure);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Mettre à jour une structure
exports.updateStructure = async (req, res) => {
    try {
        const structure = await Structure.findByPk(req.params.id);
        if (!structure) return res.status(404).json({ message: "Structure non trouvée" });

        const { categorie_id, numero_nif, numero_rccm, numero_tva, forme_juridique } = req.body;

        // Vérification des règles si catégorie change
        if (categorie_id) {
            const category = await Category.findByPk(categorie_id);
            if (category && (category.nom === 'PME' || category.nom === 'Grande entreprise')) {
                if (!numero_nif || !numero_rccm || !numero_tva) {
                    return res.status(400).json({
                        message: "Pour les PME et Grandes entreprises, NIF, RCCM et TVA sont obligatoires"
                    });
                }
                if (category.nom === 'Grande entreprise' && !forme_juridique) {
                    return res.status(400).json({ message: "Forme juridique obligatoire pour Grande entreprise" });
                }
            }
        }

        await structure.update(req.body);
        res.status(200).json(structure);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Supprimer une structure
exports.deleteStructure = async (req, res) => {
    try {
        const structure = await Structure.findByPk(req.params.id);
        if (!structure) return res.status(404).json({ message: "Structure non trouvée" });

        await structure.destroy();
        res.status(200).json({ message: "Structure supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
