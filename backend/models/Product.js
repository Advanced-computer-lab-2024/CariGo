const mongoose = require('mongoose');

const schema = mongoose.Schema;
const ratingSchema = require('./Rating')
const reviewSchema = require('./Review')

const productSchema = new schema({
    author:{
     type:mongoose.Schema.ObjectId,
     ref:'User'
    },
    name:{
     type:String
    },
    picture:{
        type:String // ??
    },
    price:{
        type:Number,
                default: 0.0
    },
    description:String,
    ratings:{
        type:[ratingSchema], default: undefined
    },
    reviews: {
        type:[reviewSchema], default: undefined
    },
    quantity:{
        type: Number
    }
  })

const product = mongoose.model('Product', productSchema);