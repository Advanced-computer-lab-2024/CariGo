const mongoose = require('mongoose');

const schema = mongoose.Schema;
const activitySchema = require('../model/Activity')
const locationSchema = require('../model/Location')
const itinerarySchema = new schema({
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    activities: {
       type:[activitySchema], default: undefined
    },
    language:String,
    price:Number,
    location:{
        pick_up:String,
        drop_off:String
    },
    availability:{
        dates:[Date] // time will be included in Date
    }


 });
const itinerary = mongoose.model('Itinerary',itinerarySchema)
 module.exports = itinerary