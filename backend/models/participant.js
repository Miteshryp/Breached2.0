const mongoose = require("mongoose");

let schema = {
   name: String,
   regNo: {
      required: true, 
      type: String
   },
   email: String,
   password: String,
   currentContest: String
};

const modelSchema = new mongoose.Schema(schema);
const model = mongoose.model("participant", modelSchema);

module.exports = model;