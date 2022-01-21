const mongoose = require("mongoose");


const schemaData = {
    dashboardDescription: String,
}



const metadataSchema = new mongoose.Schema(schemaData);
const model = mongoose.model(metadataSchema);

module.exports = model;