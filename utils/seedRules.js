/**
 * 🔹 Seeder pour injecter les règles (rules) par catégorie
 * dans la table `categories` de PostgreSQL.
 *
 * Chaque catégorie a une propriété `rules` (type JSON)
 * définie dans ton modèle Sequelize `Category`.
 */

const Category = require('../models/category'); // ✅ modèle Sequelize

// ✅ Définition complète des règles par catégorie
const categoryRules = [
  {
    category: 'Indépendant',
    rules: {
      fields_required: ['nom_structure', 'description', 'adresse', 'telephone', 'email'],
      fields_optional: ['numero_nif', 'numero_rccm', 'numero_tva', 'reseaux_sociaux', 'logo', 'tva', 'tps'],
      conditional_rules: {
        assujetti: {
          type: 'boolean',
          label: 'Êtes-vous assujetti à une ou plusieurs taxes ?',
          if_true: {
            fields_required: ['numero_nif', 'numero_rccm'],
            fields_optional: ['tva', 'tps'],
            extra_conditions: {
              tva: { requires: ['numero_tva'] }
            }
          }
        }
      },
      labels: {
        nom_structure: 'Nom commercial ou personnel',
        description: 'Courte description / bio',
        adresse: 'Adresse professionnelle',
        telephone: 'Numéro de téléphone',
        email: 'Adresse Email',
        numero_nif: 'Numéro NIF',
        numero_rccm: 'Numéro RCCM',
        numero_tva: 'Numéro TVA',
        tva: 'Taux de TVA (%)',
        tps: 'Taxe sur les prestations de services (5%)',
        reseaux_sociaux: 'Réseaux sociaux',
        logo: "Logo de l'entreprise"
      }
    }
  },

  {
    category: 'Artisan',
    rules: {
      fields_required: ['nom_structure', 'description', 'adresse', 'telephone', 'email'],
      fields_optional: ['numero_nif', 'numero_rccm', 'numero_tva', 'reseaux_sociaux', 'logo', 'tva', 'tps'],
      conditional_rules: {
        assujetti: {
          type: 'boolean',
          label: 'Êtes-vous assujetti à une ou plusieurs taxes ?',
          if_true: {
            fields_required: ['numero_nif', 'numero_rccm'],
            fields_optional: ['tva', 'tps'],
            extra_conditions: {
              tva: { requires: ['numero_tva'] }
            }
          }
        }
      },
      labels: {
        nom_structure: 'Nom commercial ou personnel',
        description: 'Courte description / bio',
        adresse: 'Adresse professionnelle',
        telephone: 'Numéro de téléphone',
        email: 'Adresse Email',
        numero_nif: 'Numéro NIF',
        numero_rccm: 'Numéro RCCM',
        numero_tva: 'Numéro TVA',
        tva: 'Taux de TVA (%)',
        tps: 'Taxe sur les prestations de services (5%)',
        reseaux_sociaux: 'Réseaux sociaux',
        logo: "Logo de l'entreprise"
      }
    }
  },

  {
    category: 'Commerçant',
    rules: {
      fields_required: ['nom_structure', 'description', 'adresse', 'telephone', 'email', 'numero_rccm'],
      fields_optional: ['numero_nif', 'numero_tva', 'reseaux_sociaux', 'logo', 'tva', 'tps'],
      conditional_rules: {
        assujetti: {
          type: 'boolean',
          label: 'Êtes-vous assujetti à une ou plusieurs taxes ?',
          if_true: {
            fields_required: ['numero_nif'],
            fields_optional: ['numero_rccm', 'tva', 'tps'],
            extra_conditions: {
              tva: { requires: ['numero_tva'] }
            }
          }
        }
      },
      labels: {
        nom_structure: 'Nom commercial ou personnel',
        description: 'Courte description / bio',
        adresse: 'Adresse professionnelle',
        telephone: 'Numéro de téléphone',
        email: 'Adresse Email',
        numero_nif: 'Numéro NIF',
        numero_rccm: 'Numéro RCCM',
        numero_tva: 'Numéro TVA',
        tva: 'Taux de TVA (%)',
        tps: 'Taxe sur les prestations de services (5%)',
        reseaux_sociaux: 'Réseaux sociaux',
        logo: "Logo de l'entreprise"
      }
    }
  },

  {
    category: 'PME',
    rules: {
      fields_required: ['nom_structure', 'adresse', 'boite_postale', 'telephone', 'email', 'numero_nif'],
      fields_optional: ['forme_juridique', 'numero_rccm', 'numero_tva', 'tva', 'tps', 'css', 'site_web', 'reseaux_sociaux', 'logo'],
      conditional_rules: {
        activite_commerciale: {
          type: 'boolean',
          label: "L'activité est-elle de nature commerciale ?",
          if_true: {
            fields_required: ['numero_rccm']
          }
        },
        assujetti_tva: {
          type: 'boolean',
          label: "L'entreprise est-elle assujettie à la TVA ?",
          if_true: {
            fields_required: ['numero_tva', 'tva']
          }
        }
      },
      default_values: { css: 1 },
      labels: {
        nom_structure: "Nom de l'entreprise ou du commerce",
        adresse: "Adresse principale d'exploitation",
        boite_postale: "Boîte postale",
        telephone: "Numéro de téléphone",
        email: "Adresse Email professionnelle",
        forme_juridique: "Forme juridique (SARL, EURL, etc.)",
        numero_nif: "Numéro NIF (obligatoire)",
        numero_rccm: "Numéro RCCM (si activité commerciale)",
        numero_tva: "Numéro TVA (si assujetti)",
        tva: "Taux de TVA (%)",
        tps: "Taxe sur les prestations de services (5%)",
        css: "Contribution sociale (1%)",
        site_web: "Site web de l'entreprise",
        reseaux_sociaux: "Réseaux sociaux",
        logo: "Logo officiel"
      }
    }
  },

  {
    category: 'Grande Entreprise',
    rules: {
      fields_required: ['nom_structure', 'adresse', 'boite_postale', 'telephone', 'email', 'forme_juridique', 'numero_nif'],
      fields_optional: ['numero_rccm', 'numero_tva', 'tva', 'tps', 'css', 'site_web', 'reseaux_sociaux', 'logo'],
      conditional_rules: {
        activite_commerciale: {
          type: 'boolean',
          label: "L'activité est-elle de nature commerciale ?",
          if_true: { fields_required: ['numero_rccm'] }
        },
        assujetti_tva: {
          type: 'boolean',
          label: "L'entreprise est-elle assujettie à la TVA ?",
          if_true: { fields_required: ['numero_tva', 'tva'] }
        }
      },
      default_values: { css: 1 },
      labels: {
        nom_structure: "Nom de l'entreprise",
        adresse: "Adresse du siège social",
        boite_postale: "Boîte postale",
        telephone: "Numéro de téléphone",
        email: "Adresse Email",
        forme_juridique: "Forme juridique (SA, SARL, etc.)",
        numero_nif: "Numéro NIF",
        numero_rccm: "Numéro RCCM (si activité commerciale)",
        numero_tva: "Numéro TVA (si assujetti)",
        tva: "Taux de TVA (%)",
        tps: "Taxe sur les prestations de services (5%)",
        css: "Contribution sociale (1%)",
        site_web: "Site web de l'entreprise",
        reseaux_sociaux: "Réseaux sociaux",
        logo: "Logo officiel"
      }
    }
  },

  {
    category: 'Prestataire de services',
    rules: {
      fields_required: ['nom_structure', 'description', 'adresse', 'telephone', 'email'],
      fields_optional: ['numero_nif', 'numero_rccm', 'numero_tva', 'reseaux_sociaux', 'logo', 'tva', 'tps'],
      conditional_rules: {
        assujetti: {
          type: 'boolean',
          label: 'Êtes-vous assujetti à une ou plusieurs taxes ?',
          if_true: {
            fields_required: ['numero_nif'],
            fields_optional: ['numero_rccm', 'tva', 'tps'],
            extra_conditions: {
              tva: { requires: ['numero_tva'] }
            }
          }
        }
      },
      labels: {
        nom_structure: 'Nom commercial ou personnel',
        description: 'Description / domaine de service',
        adresse: 'Adresse professionnelle',
        telephone: 'Numéro de téléphone',
        email: 'Adresse Email',
        numero_nif: 'Numéro NIF',
        numero_rccm: 'Numéro RCCM (si enregistré)',
        numero_tva: 'Numéro TVA',
        tva: 'Taux de TVA (%)',
        tps: 'Taxe sur les prestations de services (5%)',
        reseaux_sociaux: 'Réseaux sociaux',
        logo: "Logo de l'entreprise"
      }
    }
  }
];

/**
 * 🧠 Fonction principale de seed
 * Parcourt les catégories existantes et leur associe les règles correspondantes.
 */
const seedRules = async () => {
  for (const { category, rules } of categoryRules) {
    const cat = await Category.findOne({ where: { nom: category } });

    if (!cat) {
      console.warn(`⚠️ Catégorie '${category}' non trouvée en base.`);
      continue;
    }

    // Mise à jour du champ JSON `rules`
    await cat.update({ rules });
    console.log(`✅ Règles associées à la catégorie : ${category}`);
  }

  console.log('🎉 Toutes les règles ont été mises à jour avec succès.');
};

module.exports = seedRules;
