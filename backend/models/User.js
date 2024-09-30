const mongoose = require('mongoose');

const schema = mongoose.Schema;
const userSchema = new schema({
    username :{
        type:String,
        required :true
    },
    email:{
        type:String , required : true
    },
    password:{
        type:String ,  required: true
    },
    roles:{
        Admin:{

        },
        Tourist:{
            mobile_number:{
              type:String    
            },
            nationality:String,
            DOB:{
                type:Date,
                required:true
            },
            wallet:{
                type:Number,
                default: 0.0
            },
            isAdult:boolean
        },
        Tour_Guide:{
            mobile_number:{
                type:String
            },
            experience:{
                type: [experienceSchema],
                default: undefined
            }
        },
        Seller:{
            name :{
             type:String, 
            },
            description:{
             type:String
            },
            products:{
                type:[productSchema],default:undefined
            }
        },
        Advertiser:{
            website_link:{
                type:String 
            },
            hotline:{
                type:Number 
            },
            isAccepted:{
                type:Boolean,
                default:true
            }
        },
        Tourism_Governer:{

        }
    },
    isActive:{
        type:Boolean,
        default:true
    },
    refreshToken:String
});
const User = mongoose.model('User', userSchema);