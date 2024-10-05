const mongoose = require('mongoose');

const schema = mongoose.Schema;
const tagSchema = new schema({   
    Type:{ 
      type: String
      
    }
  });

const tag = mongoose.model('PreferenceTag', tagSchema);
module.exports = tag
