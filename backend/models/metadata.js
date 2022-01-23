const mongoose = require("mongoose");


const schemaData = {
    name: String,
    dashboardDescription: [{type: String}],
    active: Boolean
}

const metadataSchema = new mongoose.Schema(schemaData);
const model = mongoose.model("meta", metadataSchema);

module.exports = model;