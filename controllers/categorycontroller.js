const Category = require('../models/category');

// 🔹 Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
    try {
        const { nom } = req.body;
        if (!nom) {
            return res.status(400).json({ message: "Le nom de la catégorie est obligatoire" });
        }

        const category = await Category.create({ nom });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer une catégorie par ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

        await category.update(req.body);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

        await category.destroy();
        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
