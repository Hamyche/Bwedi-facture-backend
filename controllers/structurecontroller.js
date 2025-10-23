// controllers/structureController.js

const Structure = require('../models/structures');
const User = require('../models/user');
const Category = require('../models/category');

// 🔹 Créer une nouvelle structure (avec règles dynamiques selon la catégorie)
exports.createStructure = async (req, res) => {
    try {
        const {
            nom_structure, adresse, boite_postale, telephone, email,
            numero_nif, numero_rccm, numero_tva,
            tva, css, tps, forme_juridique,
            site_web, reseaux_sociaux, logo,
            assujetti, user_id, category_id
        } = req.body;

        // ⚠️ Vérification de base : champs essentiels
        if (!nom_structure || !adresse || !user_id || !category_id) {
            return res.status(400).json({ message: "Nom, adresse, utilisateur et catégorie sont obligatoires" });
        }

        // 🔹 Récupération de la catégorie et de ses règles
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ message: "Catégorie introuvable" });
        }

        const rules = category.rules_json || {};

        // 🔹 Vérification dynamique des champs requis
        if (rules.fields_required && Array.isArray(rules.fields_required)) {
            const missingFields = rules.fields_required.filter(field => !req.body[field]);
            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: `Champs manquants : ${missingFields.join(', ')}`
                });
            }
        }

        // 🔹 Application des conditions dynamiques (ex: TVA si assujetti)
        if (rules.conditional_rules) {
            // Exemple : gestion conditionnelle "assujetti"
            if (rules.conditional_rules.assujetti && assujetti === true) {
                const cond = rules.conditional_rules.assujetti.if_true;
                if (cond && cond.fields_required) {
                    const missingCondFields = cond.fields_required.filter(field => !req.body[field]);
                    if (missingCondFields.length > 0) {
                        return res.status(400).json({
                            message: `Champs requis pour assujetti : ${missingCondFields.join(', ')}`
                        });
                    }
                }
            }
        }

        // 🔹 Validation spécifique PME / Grande entreprise (logique d’origine conservée)
        if (category.nom === 'PME' || category.nom === 'Grande entreprise') {
            if (!numero_nif) {
                return res.status(400).json({ message: "Le NIF est obligatoire pour cette catégorie" });
            }

            if (category.nom === 'Grande entreprise' && !forme_juridique) {
                return res.status(400).json({ message: "Forme juridique obligatoire pour une grande entreprise" });
            }
        }

        // 🔹 Création de la structure
        const structure = await Structure.create({
            nom_structure, adresse, boite_postale, telephone, email,
            numero_nif, numero_rccm, numero_tva,
            tva, css, tps, forme_juridique,
            site_web, reseaux_sociaux, logo,
            assujetti, user_id, category_id
        });

        res.status(201).json({
            message: "Structure créée avec succès",
            structure
        });

    } catch (err) {
        console.error("Erreur création structure :", err);
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

        const { category_id, numero_nif, numero_rccm, numero_tva, forme_juridique } = req.body;

        // 🔹 Vérification dynamique si la catégorie change
        if (category_id) {
            const category = await Category.findByPk(category_id);
            const rules = category ? category.rules_json : {};

            // Vérification des champs obligatoires selon la catégorie
            if (rules.fields_required && Array.isArray(rules.fields_required)) {
                const missingFields = rules.fields_required.filter(field => !req.body[field]);
                if (missingFields.length > 0) {
                    return res.status(400).json({
                        message: `Champs requis manquants : ${missingFields.join(', ')}`
                    });
                }
            }

            // Vérifications spécifiques PME / Grande entreprise (ancienne logique conservée)
            if (category && (category.nom === 'PME' || category.nom === 'Grande entreprise')) {
                if (!numero_nif) {
                    return res.status(400).json({ message: "Le NIF est obligatoire pour cette catégorie" });
                }
                if (category.nom === 'Grande entreprise' && !forme_juridique) {
                    return res.status(400).json({ message: "Forme juridique obligatoire pour une grande entreprise" });
                }
            }
        }

        await structure.update(req.body);
        res.status(200).json({
            message: "Structure mise à jour avec succès",
            structure
        });
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
