var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Persons = require('../models/Persons');
const { default: BSON } = require('bson');

//Affiche tous les personnes
router.get('/', async(req, res) => {
    await mongoose.connect(process.env.DB_URI);
    try{
        const persons = await Persons.find();
        res.json(persons);
    }catch(err){
        console.log(err);
        res.status(500).json({erreur:"Une erreur est survenue, veuillez contacter votre administrateur."});
    }finally{
        mongoose.connection.close();
    }
})

//Affiche une seul personne selon son ID
router.get('/:id', async(req, res) => {
    await mongoose.connect(process.env.DB_URI);
    try{
        const person = await Persons.findOne({_id: req.params.id});
        if(!person){
            res.status(404).json({message:'Personne introuvable'});
        }else{
            res.json(person);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({erreur:"Une erreur est survenue, veuillez contacter votre administrateur."})
    }
})

//Ajouter une personne
router.post('/', async(req, res) => {
    await mongoose.connect(process.env.DB_URI);
    try{
        let nouvelPerson = await Persons.create(req.body);
        res.json(nouvelPerson);
    }catch(err){
        console.log(err);
        res.json(500).json({erreur: err.message});
    }finally{
        mongoose.connection.close();
    }
})

//Supprimer une personne
router.delete('/:id', async(req, res) => {
    await mongoose.connect(process.env.DB_URI);
    try{
        let personne = await Persons.deleteOne({"_id": BSON.ObjectId(req.params.id)});
        res.json(personne);
    }catch{
        console.log(err);
        res.json(500).json({erreur: err.message});
    }finally{
        mongoose.connection.close();
    }
})

// Le nombre de gens selon la couleur de leurs eyes
router.get('/stats/eyeColor', async(req,res) => {
    await mongoose.connect(process.env.DB_URI);
    try{
      let result = await Persons.aggregate([{
          $group:
          {
            "_id": "$eyeColor",
            nbPersonne: {$sum: 1}
            
          }
      }])
      res.json(result);
    }catch{
        console.log(err);
        res.json(500).json({erreur: err.message});
    }finally{
        mongoose.connection.close();
    }
  })

  // Mettre à jour des informations de la base de données
router.patch('/:id', async(req, res) => {
    await mongoose.connect(process.env.DB_URI);
    try{
        let modification = await Persons.updateOne({"_id": BSON.ObjectId(req.params.id)}, req.body);
        res.json(modification);
    }catch(err){
        console.log(err);
        res.json(500).json({erreur: err.message});
    }finally{
        mongoose.connection.close();
    }
})


router.get('/q/:attributs', async(req, res) => {
    await mongoose.connect(process.env.DB_URI)
    try{
      let attributs = RegExp("" + req.params.attributs + "");
      let result = await Persons.find(
        {$or: [
          {"name.first": attributs},
          {"name.last": attributs},
          {"email": attributs}
        ]
        })
        res.json(result)
    }catch(err){
        console.log(err);
        res.status(500).json({erreur: err.message})
    }
    finally{
        mongoose.connection.close
    }
  })

module.exports = router;