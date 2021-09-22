var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { route } = require('.');
const Pokedex = require('../models/Pokemon');
const { default: BSON } = require('bson');
const uri = "mongodb://127.0.0.1:27017/pokedex";

//Affiche tous les pokemons
router.get('/', async(req, res) => {
    await mongoose.connect(uri);
    try{
        const pokemons = await Pokedex.find();
        res.json(pokemons);
    }catch(err){
        console.log(err);
        res.status(500).json({erreur:"Une erreur est survenue, veuillez contacter votre administrateur."});
    }finally{
        mongoose.connection.close();
    }
})

//Retourne le pokemon selon le num
router.get('/num/:num', async(req, res) => {
    await mongoose.connect(uri);
    try{
        const pokemon = await Pokedex.findOne({"num": req.params.num});
        if(!pokemon){
            res.status(404).json({message:'Pokemon introuvable'});
        }else{
            res.json(pokemon);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({erreur:"Une erreur est survenue, veuillez contacter votre administrateur."})
    }
})


router.get('/evolutions/:name', async(req, res) => {
    await mongoose.connect(uri);
    try{
        const pokemon = await Pokedex.find({"next_evolution.name": req.params.name}, {"_id" : 0, "next_evolution.name" : 1, name: 1});
        if(!pokemon){
            res.status(404).json({message:'Pokemon introuvable'});
        }else{
            console.log(pokemon[0].name)
            console.log(pokemon[0].next_evolution[0].name)
            res.json(pokemon[0].name + "," + pokemon[0].next_evolution[0].name + "," + pokemon[0].next_evolution[0].name);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({erreur:"Une erreur est survenue, veuillez contacter votre administrateur."})
    }
})

router.get('/spawn_chance/:min/:max', async(req, res) => {
    await mongoose.connect(uri);
    try{
        const pokemon = await Pokedex.find({"spawn_chance": {$gte: req.params.min, $lte : req.params.max} });
        if(!pokemon){
            res.status(404).json({message:'Pokemon introuvable'});
        }else{
            res.json(pokemon);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({erreur:"Une erreur est survenue, veuillez contacter votre administrateur."})
    }
})

router.post('/', async(req, res) => {
    await mongoose.connect(uri);
    try{
        let nouveauPokemon = await Pokedex.create(req.body);
        res.json(nouveauPokemon);
    }catch(err){
        console.log(err);
        res.status(500).json({erreur: err.message});
    }finally{
        mongoose.connection.close();
    }
})

router.patch('/:id', async(req, res) => {
    await mongoose.connect(uri);
    try{
        let modification = await Pokedex.updateOne({"_id": BSON.ObjectId(req.params.id)}, req.body);
        res.json(modification);
    }catch(err){
        console.log(err);
        res.status(500).json({erreur: err.message});
    }finally{
        mongoose.connection.close();
    }
})

router.delete('/:id', async(req, res) => {
    await mongoose.connect(uri);
    try{
        let pokemon = await Pokedex.deleteOne({"_id": BSON.ObjectId(req.params.id)});
        res.json(pokemon);
    }catch{
        console.log(err);
        res.json(500).json({erreur: err.message});
    }finally{
        mongoose.connection.close();
    }
})

module.exports = router;
