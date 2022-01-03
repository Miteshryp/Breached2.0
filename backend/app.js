
// ------------------------------- Imports ---------------------------------------------

// modules
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("node-color-log");
const mongoose = require("mongoose");

if(dotenv.error) {
   logger.error("Dotenv initialisation failed.");
   logger.warn(dotenv.error);
}

// settings
const corsOptions = require("./utils/corsOptions");
const serverSettings = require("./utils/serverSettings");


// ------------------------------- Initialisation --------------------------------------
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

// Database initiation.
const dburl = process.env.DB_URI;
let initDatabase = async () => { await mongoose.connect(dburl) };
initDatabase();

// routers
app.use("/leaderboard", require("./routes/leaderBoard"));
app.use("/user", require("./routes/user"));


app.listen(serverSettings.port, async () => {
   logger.info("Server listening on port: " + serverSettings.port);
});