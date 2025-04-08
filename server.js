const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './server.json'; // <- nom exact du fichier

// GET zones
app.get('/server.json', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err);
      return res.status(500).send('Erreur de lecture');
    }
    res.json(JSON.parse(data));
  });
});

// POST zones
app.post('/server.json', (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), err => {
    if (err) {
      console.error("Erreur d’écriture :", err);
      return res.status(500).send('Erreur d’écriture');
    }
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
