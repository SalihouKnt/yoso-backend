// index.js
// Ce fichier est le "point d'entrée" de notre backend :
// c'est lui que l'on va lancer pour démarrer le serveur.

const express = require('express');
// On importe le paquet Express qu'on vient d'installer.
// "require" veut dire : va chercher ce module et rends-le disponible ici,
// sous le nom "express".

const app = express();
// On crée une "application" Express : c'est l'objet principal
// à travers lequel on va définir toutes les routes de notre API.

const PORT = 3000;
// Un "port", c'est un numéro qui identifie une porte de communication
// sur ta machine. Un ordinateur peut faire tourner plusieurs programmes
// réseau en même temps, chacun sur un port différent, pour ne pas se
// marcher dessus. 3000 est un choix classique pour le développement local.

app.get('/', (req, res) => {
  // On définit une "route" : quand quelqu'un envoie une requête de type
  // GET vers l'adresse "/" (la racine de notre site), la fonction
  // ci-dessous est exécutée.
  //
  // "req" (requête) = tout ce que la personne qui appelle a envoyé
  // "res" (réponse) = l'outil qu'on utilise pour répondre
  res.send('Hello YOSO C cool ce PROJET !');
  // On répond avec un simple texte.
});

app.listen(PORT, () => {
  // "listen" démarre le serveur : à partir de maintenant, il reste actif
  // et surveille en permanence les requêtes qui arrivent sur ce port.
  // La fonction passée en second argument s'exécute une seule fois,
  // au moment où le serveur démarre — pratique pour confirmer que
  // tout s'est bien lancé.
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});