const mongoose = require("mongoose");

let schema = {
   name: String,
   regNo: String, 
   email: {
      required: true, 
      type: String
   },
   password: String,
   currentContest: String
};

const modelSchema = new mongoose.Schema(schema);
const model = mongoose.model("participant", modelSchema);

module.exports = model;