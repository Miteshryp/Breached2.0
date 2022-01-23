
// ------------------------------- Imports ---------------------------------------------

// modules
let extension = "";
if(process.env.NODE_ENV === 'production') extension = ".prod";
else if(process.env.NODE_ENV === 'development') extension = ".dev";
else extension = "";
console.debug(`./.env${extension}`);

const dotenv = require("dotenv").config({path: `./.env${extension}`});
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

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database initiation.
const dburl = process.env.DB_URI;
let initDatabase = async () => {
   logger.warn("Connecting to Database: " + dburl);
   await mongoose.connect(dburl);
   logger.info("Connected to database successfully.");
};
initDatabase();

// routers
app.use("/contest", require("./routes/contest"));
app.use("/user", require("./routes/user"));
app.use("/meta", require("./routes/metadata"));

app.listen(serverSettings.port, async () => {
   logger.info("Server host: " + serverSettings.host);
   logger.info("Server listening on port: " + serverSettings.port);
});