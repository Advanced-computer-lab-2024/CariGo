const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema=new schema({
    name: {
        type: String,
        required: true,
        unique: true, 
      },
      description: {
        type: String,
        required: false,
      },
}

)
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;