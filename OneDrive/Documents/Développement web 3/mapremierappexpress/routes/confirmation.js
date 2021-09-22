var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:noConfirmation/:sexe/:prenom/:nom', function(req, res, next) {
  if(req.params.sexe == "f" || req.params.sexe == 'F'){
    res.send('Bonjour Madame ' + req.params.nom + '\n' + 'Nous avons bien reçu votre demande.\nNous vous reviendrons le plus tôt possible.\nEntre-temps, si vous devez nous contacter,\n assurez-vous de nous fournir le numéro de\ndemande suivant : ' + req.params.noConfirmation + '\n' + '\nMerci!');
  }
  else if(req.params.sexe == "m" || req.params.sexe == 'M'){
    res.send('Bonjour Monsieur ' + req.params.nom + '\n' + 'Nous avons bien reçu votre demande.\nNous vous reviendrons le plus tôt possible.\nEntre-temps, si vous devez nous contacter,\n assurez-vous de nous fournir le numéro de\ndemande suivant : ' + req.params.noConfirmation + '\n' + '\nMerci!');
  }
  console.log(req.params.noUser);
  console.log(req.params.nom);
  res.send('respond with a resource');
  console.log(typeof(req.params.noUser));
  console.log(typeof(req.params.nom));
});
module.exports = router;