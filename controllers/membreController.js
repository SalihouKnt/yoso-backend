const Membre = require('../models/Membre');
// On importe le modèle créé à l'étape précédente. Les deux points ".."
// signifient "remonte d'un dossier" : on sort de "controllers" pour
// aller chercher dans "models".

exports.getMembres = async (req, res) => {
  // "exports.getMembres = ..." rend cette fonction utilisable depuis
  // d'autres fichiers. Le mot "async" signale que la fonction contient
  // des opérations qui prennent du temps (ici, interroger la base de
  // données). Il autorise l'usage du mot "await" à l'intérieur.
  try {
    const membres = await Membre.find();
    // "Membre.find()" veut dire "va chercher tous les membres". Le mot
    // "await" veut dire "attends que la base ait répondu avant de
    // passer à la ligne suivante". Sans lui, tu récupérerais une
    // promesse de résultat et non le résultat lui-même.
    res.json(membres);
    // On envoie la liste au format JSON.
  } catch (err) {
    // Si quelque chose se passe mal dans le bloc "try" (par exemple la
    // base est injoignable), on arrive ici au lieu de faire planter
    // tout le serveur.
    res.status(500).json({ erreur: err.message });
    // 500 est le code HTTP standard qui signifie "erreur du serveur".
  }
};

exports.creerMembre = async (req, res) => {
  try {
    const nouveauMembre = new Membre(req.body);
    // "req.body" contient les données envoyées par celui qui appelle
    // l'API. On crée un nouvel objet "Membre" avec ces données.
    await nouveauMembre.save();
    // ".save()" enregistre réellement ce document dans MongoDB.
    res.status(201).json(nouveauMembre);
    // 201 est le code HTTP standard qui signifie "création réussie".
  } catch (err) {
    res.status(400).json({ erreur: err.message });
    // 400 signifie "demande invalide", par exemple si le nom obligatoire
    // n'a pas été envoyé.
  }
};

exports.modifierMembre = async (req, res) => {
  try {
    const membre = await Membre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // "req.params.id" est l'identifiant lu dans l'adresse (voir les
    // routes à l'étape suivante). "findByIdAndUpdate" retrouve le membre
    // par cet identifiant et met à jour ses champs avec les données
    // reçues. "{ new: true }" demande de renvoyer le membre APRÈS la
    // modification (par défaut, Mongoose renverrait la version d'avant).
    res.json(membre);
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
};

exports.supprimerMembre = async (req, res) => {
  try {
    await Membre.findByIdAndDelete(req.params.id);
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    res.status(400).json({ erreur: err.message });
  }
};