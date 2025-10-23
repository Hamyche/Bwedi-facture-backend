const Category = require('../models/category');

// 🔹 Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'nom', 'description'],
            order: [['id', 'ASC']]
        });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer une catégorie par ID (optionnel)
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            attributes: ['id', 'nom', 'description']
        });
        if (!category)
            return res.status(404).json({ message: "Catégorie non trouvée" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Récupérer uniquement les catégories prédéfinies (utile pour le front)
exports.getPredefinedCategories = async (req, res) => {
    try {
        const predefinedNoms = [
            'Indépendant',
            'Commerçant',
            'Artisan',
            'PME',
            'Grande Entreprise',
            'Prestataire de services'
        ];
        const categories = await Category.findAll({
            where: { nom: predefinedNoms },
            attributes: ['id', 'nom', 'description'],
            order: [['id', 'ASC']]
        });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
