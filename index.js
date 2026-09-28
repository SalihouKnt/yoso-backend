require('dotenv').config();
// Cette ligne charge les valeurs du fichier .env et les rend disponibles
// dans "process.env". Elle doit rester tout en haut du fichier, avant
// toute autre ligne qui aurait besoin de ces valeurs.

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
// Cette ligne dit à Express : "quand une requête contient des données
// au format JSON, transforme-les en objet JavaScript utilisable dans
// "req.body"". Sans elle, req.body serait vide.

const PORT = process.env.PORT || 3000;
// On utilise le port défini dans le fichier .env. S'il n'existe pas,
// on prend 3000 par défaut. Le double trait "||" signifie "ou".

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err.message));
// Cette instruction tente de se connecter à ta base Atlas. Se connecter
// prend un peu de temps (c'est une communication par internet), donc le
// résultat n'est pas immédiat : ".then()" décrit ce qu'on fait si la
// connexion réussit, et ".catch()" ce qu'on fait si elle échoue.

app.get('/', (req, res) => {
  res.send('Hello YOSO !');
});

const membreRoutes = require('./routes/membreRoutes');
app.use('/api/membres', membreRoutes);
// "app.use(préfixe, routeur)" veut dire : "toutes les routes définies
// dans ce routeur sont accessibles en ajoutant ce préfixe devant
// l'adresse". Concrètement, la route GET '/' du routeur devient
// GET /api/membres, et la route PUT '/:id' devient PUT /api/membres/68a1f2c.

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});