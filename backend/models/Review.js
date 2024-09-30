const mongoose = require('mongoose');

const schema = mongoose.Schema;

const reviewSchema = new schema({
    content:{
      type:String
    },
    author:{
      type:mongoose.Schema.ObjectId,
      ref:'User'
    }
})

const review = mongoose.model('Review', reviewSchema);
module.exports = review