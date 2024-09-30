const mongoose = require('mongoose');

const schema = mongoose.Schema;


const locationSchema = new schema({
    longitude:{
      type:String
    },
    latitude:{
        type:String
    },
   nation:{
      country:String,
      city:String
    },
    activity:{
      type:mongoose.Schema.ObjectId,
      ref:'Activity'
    }
  });

const location = mongoose.model('Location', locationSchema);
module.exports= location