const mongoose = require('mongoose');

const schema = mongoose.Schema;
const tagSchema = new schema({   // Tourism Governers' Tags
    place:{ 
      type: mongoose.Schema.ObjectId,
      ref:'Vintage'
    },
    type:{
        type:String
    },
    historical_period:{
        type:String
    }
  });

const tag = mongoose.model('Tag', tagSchema);
module.exports = tag
  