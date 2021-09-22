const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokemonSchema = new Schema(
    {
        num: {type: String, required: true},
        name: {type: String, required : true},
        img: {type: String},
        type: [
          {_id: false, type: String, required : true}
        ],
        height: {type: String},
        weight: {type: String},
        candy: {type: String},
        candy_count: {type: Number},
        egg: {type: String},
        spawn_chance: {type: Number},
        avg_spawns: {type: Number},
        spawn_time: {type: String, required : true},
        multipliers: [{type: Number}],
        weaknesses: [
            {_id: false, type: String}
        ],
        next_evolution: [{
            _id:false,
            num : {type:String},
            name: {type :String}
        }]
    }
)

module.exports = mongoose.model('pokedex', PokemonSchema);