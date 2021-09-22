const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonsSchema = new Schema(
    {
        isActive: 
          { 
            type : Boolean, 
            required: true
          }, 
        balance: 
          { 
            type : Number, 
            required: true,
            maxLength: 100
          },
        picture: 
          {
            type : String,
            maxLength: 256
          },
        age: 
          {
            type : Number,
            required:true,
            maxLength: 3
          },
        eyeColor: 
          {
            type : String,
            maxLength: 20
          },
        name: {
          first: 
            {
              type :String, 
              required: true,
              maxLength: 100
            },
          last: 
            {
              type : String,
              required: true,
              maxLength: 100
            }
        },
        company: 
          {
            type : String,
            maxLength: 100
          },
        email: 
          {
            type : String,
            maxLength: 256,
            match: /.+\@.+\..+/
          },
        phone: 
          {
            type : Number,
            max: 9999999999,
            min: 1000000000
          },
        address: 
          {
            type : String,
            maxLength: 256
          },
        about: 
          {
            type: String,
            maxLength: 256
          },
        registered: 
          {
            required: true, 
            type: Date
          
          },
        latitude: 
          {
            type: String,
            maxLength: 15
          },
        longitude: 
          {
            type: String,
            maxLength: 15
          },
        tags: [
          {
            type: String,
            maxLength: 50
          }
        ],
        friends: [
          {
            name: {
              _id:false, //Enlève l'id quand on ajout un ami
              type:String,
              maxLength: 205
            }
          }
        ],
        greeting: 
          {
            type: String,
            maxLength: 256
          },
        favoriteFruit: 
          {
            type: String,
            maxLength: 100
          }
      }
)
                                //Nom de la collection
module.exports = mongoose.model('Persons', PersonsSchema);
