const mongoose = require('mongoose');

const schema = mongoose.Schema;
const experienceSchema = new schema({
    years_of_experience:{
        type: Number
    },
    previous_work:{
        type: String
    },
    author:{
      type: mongoose.Schema.ObjectId,
      ref:'User'
    }
  });

  const exp = mongoose.model('Experience', experienceSchema);
  