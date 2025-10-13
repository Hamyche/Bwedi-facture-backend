const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Serveur Bwedi-facture-backend OK ✅');
});

app.listen(PORT, () => {
  console.log(`Serveur Bwedi-facture-backend démarré sur http://localhost:${PORT}`);
});
