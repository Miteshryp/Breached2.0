// const express = require("express");
// const app = express();

// app.get("/test", async (req, res) => {

// });

// services
// see overall leaderboard
// see total time spent
// see self points
// see self rank

// submit an answer
// get a hint

const mongoose = require("mongoose");
const logger = require("node-color-log");

const User = require("./../models/participant");
const Contest = require("./../models/contest");

exports.getLeaderboard = async (req, res) => {

}

exports.getSelfPoints = async (req, res) => {
   let {_id: pid} = req.userData;  
   

   // for now we only have one contest, so this is gonna work 
   let contest = await Contest.findOne({participant: { participantID: mongoose.Types.ObjectId(pid) }});

   let score = contest.participant[participantID];
   logger.debug("Score" + score);
}

exports.getSelfRank = async (req, res) => {

}



// user submits an ans
exports.submission = async(req, res) => {

}




// ------------------------ Admin --------------------------


exports.createContest = async(req, res) => {
   let data = req.body.contestData;

   let contest = new Contest(data);
   contest = await contest.save();
   
   if(!contest) {
      return res
         .status(500)
         .send({message: "Failed to create contest! Unknown error", complete: false});
   }

   return res
      .status(200)
      .send({message: "Contest created successfully", complete: true});
}