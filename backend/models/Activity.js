const mongoose = require('mongoose');

const schema = mongoose.Schema;
const ratingSchema = require('./Rating')
const reviewSchema = require('./Review')
const location = require('./Location');
const activitySchema = new schema({
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    start_date:{
        type:Date, required: true
    },
    end_date:{
        type: Date,
    },
    duration :Number,
    time:{
        type:String, required: true
    },
    location:{
        type:location
    },  
    price:{
        range:{
            min : Number,
            max : Number
        }
    },
    category:{
        type:[String], default:undefined  // could be list or string only
     },
    discount:{
        type: Number, default: 0
    },
    tags:{                           // Admins' tags  (preferences)
        type:[String], default: undefined
    },
    isOpened:{
    type:Boolean, default:true
    },
    ratings:{
        type:[ratingSchema], default: undefined
    },
    reviews: {
        type:[reviewSchema], default: undefined
    },
  })
  const activity = mongoose.model('Activity', activitySchema);
  module.exports = activity