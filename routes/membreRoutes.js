const express = require('express');
const router = express.Router();
// "express.Router()" crée un mini-routeur : un groupe de routes que
// l'on pourra brancher d'un coup sur l'application principale.

const membreController = require('../controllers/membreController');

router.get('/', membreController.getMembres);
router.post('/', membreController.creerMembre);
router.put('/:id', membreController.modifierMembre);
router.delete('/:id', membreController.supprimerMembre);
// Dans une adresse, ":id" est un paramètre variable : n'importe quelle
// valeur écrite à cet endroit est capturée et disponible dans le
// contrôleur sous "req.params.id". Par exemple, un appel vers
// "/68a1f2c" donnera req.params.id égal à "68a1f2c".

module.exports = router;