var express = require('express');
const { MongoClient, MongoRuntimeError, MongoDBNamespace } = require('mongodb');
var router = express.Router();
const BSON = require('bson');
var validator = require('validator');
var element = "";
const uri = "mongodb://127.0.0.1:27017";

router.get('/', async(req, res) => {
  const client = new MongoClient(uri);
      try{
        await client.connect();
        const db = client.db("persons");
        const personneCollection = db.collection("persons");
        var listePersonnes = await personneCollection.find({}).toArray();
      }catch(err){
        console.log(err.message);
        res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"});
      }
      finally{
        await client.close();
        res.json(listePersonnes);
      }
});

router.post('/', async(req, res) => {
  if(verification(req) == ""){
    const client = new MongoClient(uri);
    var result;
        try{
          await client.connect();
          const db = client.db("persons");
          const personneCollection = db.collection("persons");
          const today = new Date();
          
          const docs = {
            isActive: req.body.isActive,
            balance: req.body.balance,
            name:{"first": req.body.first,"last":req.body.last},
            age: req.body.age,
            registered: today.toUTCString()
          }
          result = await personneCollection.insertOne(docs);
          console.log(`${result.insertedId}`);
        }finally{
          await client.close();
          res.json(result);
        }
  }
});

router.put('/', async(req, res) => {
  const client = new MongoClient(uri);
  var result;
  try{
    await client.connect();
    const db = client.db("persons");
    const personneCollection = db.collection("persons");
    const doc1 = { 
      $set:{
        isActive: req.body.isActive,
        balance: req.body.balance,
        name:{"first": req.body.first,"last":req.body.last},
        age: req.body.age
      }
    }
    result = await personneCollection.updateOne({'_id': BSON.ObjectId(req.body.id)}, doc1)
  }finally{
    await client.close();
    res.json(result);
  }
})

router.delete('/', async(req, res) => {
  const persons = new MongoClient(uri);
  var result;
  try{
    if(req.body.id != null && req.body.id != ""){
      await persons.connect();
      const db = persons.db("persons");
      const personneCollection = db.collection("persons");
      result = await personneCollection.deleteOne({"_id": BSON.ObjectId(req.body.id)});
    }
  }finally{
    await persons.close();
    res.json(result);
  }
})

router.get('/:id', async(req, res) => {
  const persons = new MongoClient(uri);
  var result;
  try{
    await persons.connect();
    const db = persons.db('persons');
    const personneCollection = db.collection('persons');
    result = await personneCollection.findOne({"_id": BSON.ObjectId(req.params.id)});
  }finally{
    await persons.close();
    res.json(result);
  }
})

router.get('/q/:attributs', async(req, res) => {
  const persons = new MongoClient(uri);
  var result;
  try{
    await persons.connect();
    const db = persons.db('persons');
    const personneCollection = db.collection('persons');
    var attributs = RegExp("" + req.params.attributs + "");
    result = await personneCollection.find(
      {$or: [
        {"name.first": attributs},
        {"name.last": attributs},
        {"email": attributs}
      ]
      }).toArray();
  }finally{
    await persons.close();
    res.json(result);
  }
})

router.get('/stats/eyeColor', async(req,res) => {
  const persons = new MongoClient(uri);
  var result;
  try{
    await persons.connect();
    const db = persons.db('persons');
    const personneCollection = db.collection('persons');
    result = await personneCollection.aggregate([{
        $group:
        {
          "_id": "$eyeColor",
          nbPersonne: {$sum: 1}
          
        }
    }]).toArray()
  }finally{
    await persons.close();
    res.json(result);
  }
})

router.get('/stats/balance/:min/:max', async(req,res) => {
  const persons = new MongoClient(uri);
  var result;
  try{
    await persons.connect();
    const db = persons.db('persons');
    const personneCollection = db.collection('persons');
    result = await personneCollection.aggregate([{
        $group:
        {
          "_id": "$eyeColor",
          nbPersonne: {$sum: 1}
          
        }
    }]).toArray()
  }finally{
    await persons.close();
    res.json(result);
  }
})

function verification(req)
{
  if(!validator.isEmpty(req.body.isActive)){
    element += "La valeur isActive n'existe pas.";
  }
  if(!validator.isBoolean(req.body.isActive)){
    element += "La valeur de isActive n'est pas un boolean";
  }
  if(!validator.isEmpty(req.body.balance)){
    element += "La valeur balance n'existe pas";
  }
  if(!validator.isDecimal(req.body.balance)){
    element += "La valeur de balance n'est pas une valeur décimal";
  }
  if(!validator.isEmpty(req.body.first)){
    element += "La valeur du prenom n'existe pas";
  }
  if(!validator.isAlpha(req.body.first, fr-CA)){
    element += "La valeur n'est pas un string";
  }
  if(!validator.isEmpty(req.body.last)){
    element += "La valeur du prenom n'existe pas";
  }
  if(!validator.isAlpha(req.body.last, fr-CA)){
    element += "La valeur n'est pas un string";
  }
  console.log("-----------------------------------------");
  console.log(element);
  console.log("----------------------------------------");
}
  module.exports = router;