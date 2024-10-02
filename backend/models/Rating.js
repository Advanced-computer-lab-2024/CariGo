const mongoose = require('mongoose');

const schema = mongoose.Schema;


const ratingSchema = new schema({
    content:{
      type:Number
    },
    author:{
      type:mongoose.Schema.ObjectId,
      ref:'User'
    }
  })

const rating = mongoose.model('Rating', ratingSchema);
module.exports = ratingSchema