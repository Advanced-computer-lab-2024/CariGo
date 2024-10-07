const mongoose = require("mongoose");

const schema = mongoose.Schema;

const locationSchema = new schema({
  longitude:  {type: String,
    default:""
  },
  latitude:  {type: String,
    default:""
  },
  nation: {
    country: {type: String,
      default:""
    },
    city:  {type: String,
      default:""
    },
  },
});

module.exports = locationSchema;
