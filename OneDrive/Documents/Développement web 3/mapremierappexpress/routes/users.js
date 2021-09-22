var express = require('express');
var router = express.Router();
const validator = require('validator');
var elementPresent = "Il vous manque un ou plusieurs élément : ";

/* POST users listing. */
router.post('/', function(req, res, next) {
  console.log('log : Appel de la méthode POST');
  console.log(req.body);
  console.log(Object.keys(req.body).length);
  verification(req,res);
});

router.put('/:user', function(req, res, next) {
  console.log("Modification : " + req.params.user);
  verification(req,res);
});

router.delete("/:id", function(req, res, next) {
  if(validator.isEmpty(req.params.id)){
    req.json("L'id est vide");
  }
  else if(!validator.isDecimal(req.params.id,{force_decimal: false, decimal_digits: '0', local: "en-CA"})){
    res.json("La valeur doit être un chiffre ou un nombe entier.");
  }
  else{
    console.log("Suppréssion de la données" + req.params.id);
    res.json("Suppression des données de l'élément " + req.params.id);
  }
});

function verification(req,res){
  var nombreElement = Object.keys(req.body).length;
  if (req.body.prenom != null && req.body.nom != null && req.body.telephone != null && req.body.courriel != null && nombreElement == 4 || req.body.prenom != null && req.body.nom != null && req.body.telephone != null && req.body.courriel != null && req.body.cellulaire != null && nombreElement == 5) {
    if (validator.isEmpty(req.body.prenom)) {
      elementPresent += "Il vous manque votre prénom. ";
    }
    if (validator.isEmpty(req.body.nom)) {
      elementPresent += "Il vous manque votre nom. ";
    }
    if (validator.isEmpty(req.body.telephone)) {
      elementPresent += "Il vous manque votre numéro de téléphone. ";
    }
    if (validator.isEmpty(req.body.courriel)) {
      elementPresent += "Il vous manque votre courriel. ";
    }
    if (nombreElement == 5) {
      if (validator.isEmpty(req.body.cellulaire)) {
        elementPresent += "Il vous manque votre numéro de cellulaire";
      }
      if (!validator.isMobilePhone(req.body.cellulaire, "en-CA")) {
        elementPresent += "Votre numéro de cellulaire est incorrect";
      }
    }
    if (!validator.isLength(req.body.prenom, { min: 2, max: 30 })) {
      elementPresent += "Le nombre de caractère pour le prénom est de 2 à 30";
    }
    if (!validator.isLength(req.body.nom, { min: 2, max: 30 })) {
      elementPresent += "Le nombre de caractère pour le nom est de 2 à 30 maximum";
    }
    if (!validator.isMobilePhone(req.body.telephone, "en-CA")) {
      elementPresent += "Votre numéro de téléphone est incorrect";
    }
    if (!validator.isEmail(req.body.courriel)) {
      elementPresent += "Votre adresse courriel est invalide";
    }
    if (elementPresent == "Il vous manque un ou plusieurs élément : ") {
      console.log('Vous avez tous les éléments');
      res.json('Vous avez tous les éléments');
    } else {
      console.log(elementPresent);
      res.json(elementPresent);
      elementPresent = "Il vous manque un ou plusieurs élément : ";
    }
  } else {
    var variableManquante = "";
    if (req.body.prenom == null) {
      variableManquante += "Il manque votre prenom.";
    }
    if (req.body.nom == null) {
      variableManquante += "Il manque votre nom.";
    }
    if (req.body.telephone == null) {
      variableManquante += "Il manque votre téléphone.";
    }
    if (req.body.courriel == null) {
      variableManquante += "Il manque votre courriel.";
    }
    if (nombreElement > 4) {
      variableManquante += "Vous avez trop d'éléments";
    }
    res.json("Ils vous manquent une ou plusieurs information obligatoire : " + variableManquante);
  }
}
module.exports = router;
