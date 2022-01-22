const contestController = require("./contest");
const userController = require("./auth");
const metaController = require("./metadata");

let controller = {
   contestController, userController, metaController
};
module.exports = controller;