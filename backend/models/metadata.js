const mongoose = require("mongoose");


const schemaData = {
    dashboardDescription: String,
}

const metadataSchema = new mongoose.Schema(schemaData);
const model = mongoose.model("meta", metadataSchema);

module.exports = model;