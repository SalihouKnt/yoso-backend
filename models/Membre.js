const mongoose = require('mongoose');

// Un "schema" décrit précisément à quoi doit ressembler un document
// "membre" dans la base : quels champs existent, de quel type ils sont,
// lesquels sont obligatoires. Mongoose vérifiera ces règles à chaque
// enregistrement et refusera tout ce qui ne les respecte pas.
const membreSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  // "type: String" veut dire que ce champ doit être du texte.
  // "required: true" veut dire qu'il est obligatoire : Mongoose refusera
  // d'enregistrer un membre sans nom.
  prenom: { type: String },
  email: { type: String },
  telephone: { type: String },
  dateNaissance: { type: Date },
  categorie: {
    type: String,
    enum: ['Enfant', 'Ado', 'Adulte', 'Étudiant'],
    // "enum" est une liste fermée : seules ces valeurs sont acceptées.
  },
  montantDu: { type: Number, default: 0 },
  // "default: 0" veut dire que si on ne précise pas ce champ à la
  // création, Mongoose lui donne automatiquement la valeur 0.
  montantPaye: { type: Number, default: 0 },
  statutLicence: { type: String, default: 'Non demandée' },
}, {
  timestamps: true
  // Cette option demande à Mongoose d'ajouter et de gérer tout seul deux
  // champs : "createdAt" (date de création) et "updatedAt" (date de la
  // dernière modification).
});

module.exports = mongoose.model('Membre', membreSchema);
// "module.exports" rend ce modèle utilisable depuis d'autres fichiers,
// grâce à "require". mongoose.model('Membre', ...) crée le modèle et le
// relie à une collection MongoDB qui s'appellera automatiquement
// "membres" (en minuscules, au pluriel).