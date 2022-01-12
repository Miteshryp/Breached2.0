const mongoose = require("mongoose");

let schema = {
   name: String,
   regNo: {
      required: true, 
      type: Number
   },
   email: String,
   password: String
};

const modelSchema = new mongoose.Schema(schema);
const model = mongoose.model("participant", modelSchema);

module.exports = model;