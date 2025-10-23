const seedRules = require('./utils/seedRules');

seedRules()
  .then(() => console.log('Seeding terminé'))
  .catch(err => console.error('Erreur pendant le seeding :', err));
