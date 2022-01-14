// const express = require("express");
// const app = express();

// app.get("/test", async (req, res) => {

// });

// services
// get all contest brief
// get contest list which user is participating in
// post - register in a contest

// get overall leaderboard
// get self points
// get self rank

// post - submit an answer
// get a hint

const uuid = require("uuid");
const mongoose = require("mongoose");
const logger = require("node-color-log");
const yup = require("yup");

const Contest = require("./../models/contest");



// ----------------------- Helper Functions ---------------------

const errorResponse = function(res, errorMsg, extraFields = null, statusCode = 500) {
   return res
      .status(statusCode)
      .send(extraFields ? {message: errorMsg, complete: false, ...extraFields} : {message: errorMsg, complete: false});
}
const successResponse = function(res,responseMsg, extraFields = null, statusCode = 200) {
   return res
      .status(statusCode)
      .send(extraFields ? {message: responseMsg, complete: true, ...extraFields} : {message: responseMsg, complete: true});
}


// Working
async function generateLeaderboard(contestID) {
   let contest = await Contest.findOne({_id: contestID});
   let participants = contest.participant;

   if(!contest) return null;

   const handleTimeCompare = (a,b) => {
      let diff = b.lastSubmissionTime.getTime() - a.lastSubmissionTime.getTime();
      return diff;
   }
   
   const handleScoreCompare = (a,b) => {
      if(a.score === b.score) return handleTimeCompare(a,b);
      return a.score > b.score ? -1 : 1;
   }
   
   participants.sort((p1, p2) => {
      return handleScoreCompare(p1, p2);
   });

   return participants;
}


function checkContestTime(contest) {
   let time = new Date();
   if(contest.endTime.getTime() < time.getTime()) return false;
   return true;
}













// --------------------- Controller Functions --------------------------

exports.getContest = async (req, res) => {
   let {userData} = req;
   let {contestID} = req.body;

   let contest = await Contest.findOne({_id: contestID});

   if(!contest)
      return errorResponse(res, "Invalid Contest ID");
   return successResponse(res, "Contest successfully retrieved", {contest});
}



exports.getActiveContestList = async (req, res) => {
   let {contestID} = req.body;
   let {userData} = req;

   let contest = await Contest.find({});

   if(!contest)
      return errorResponse(res, "Invalid ContestID");
   
   let contestList = [];
   for(let i = 0; i < contest.length; i++) {
      if(!checkContestTime(contest[i])) continue;

      // @TODO: Want registered mark?
      contestData = contest[i];
      contestList.push(contestData);
   }

   return successResponse(res, "Contest data retrieved", {data: {contestList}});
}


// Working
exports.getContestList = async (req, res) => {
   let {_id: userID} = req.userData;
   const findFilter = {
      _id: true,
      name: true,
      startTime: true,
      endTime: true,
      participant: true
   }

   let contest = await Contest.find({}, findFilter);
   
   if(!contest) 
   return errorResponse(res, "Contests could not be retrived.");
   
   logger.debug("Got all contests");
   
   // Marking registered contest in the data.
   let contestList = [];
   for(let i = 0; i < contest.length; i++) {
      // if(contest[i].endTime.getTime() < currTime.getTime()) continue;
      let registered = false;
      for(let j = 0; j < contest[i].participant.length; j++) {
         if(contest[i].participant[j].participantID === userID) registered = true;
      }

      let contestData = {
         registered,
         contest: contest[i]
      };
      contestList.push(contestData);
   }

   logger.info("Returning List. ")
   return successResponse(res, "Contests Breif Retrieved", {data: {contestList}});
}



// Working
exports.getRegisteredContest = async (req, res) => {
   // userData is a decoded json object processed in verifyAuth middleware
   // hence, the userID cannot is always secure to pass into database.
   let userID = req.userData._id;
   let contests = await Contest.find({"participant.participantID": userID});

   if(!contests) return errorResponse(res, "Registered Contests could not be retrived");
   return successResponse(res, "Registered Contests Retrieved.", {data: {contestList: contests}});
}



// Working
exports.registerInContest = async (req, res) => {
   // let inputSchema = yup.object().shape({
   //    contestID: yup.string().min(1)
   // });


   let {contestID} = req.body;
   let {_id: userID} = req.userData;

   // prevent duplicate entry
   let searchResponse = await Contest.findOne({_id: contestID, "participant.participantID": userID});
   if(searchResponse) return errorResponse(res, "User already registered");

   logger.debug("User Eligible for registration");

   // check if contestID is valid
   let contest = await Contest.findOne({_id: contestID});
   
   if(!contest) 
      return errorResponse(res, "Invalid contestID");
   if(!checkContestTime(contest)) 
      return errorResponse(res, "Registration Failed. Contest has ended");

   logger.debug("Contest Valid")
   
   let userRegister = {
      participantID: userID,
      score: 0,
      lastSubmissionTime: null,
      currentQues: contest.question[0].qid 
   };

   // updating participant array
   let insertResponse = await Contest.updateOne({_id: contestID}, 
      {"$push":
         {
            "participant": userRegister
         }
      });
   if(!insertResponse) return errorResponse(res, "Failed to update contest info", {fatal: true});
   
   logger.info("Registration successful");
   return successResponse(res, "User registered successfully");
}



// Working
exports.getLeaderboard = async (req, res) => {
   let contestID = req.body.contestID;
   let rankList = await generateLeaderboard(contestID);

   if(!rankList)
      return errorResponse(res, "Leaderboard could not be fetched!");
   

   return successResponse(res, "Leaderboard fetched", {data: {rankList}});
}



// Working
exports.getSelfPoints = async (req, res) => {
   let {contestID} = req.body;
   let pid = req.userData._id;  
    
   let contest = await Contest.findOne({_id:contestID ,"participant.participantID": pid });

   if(!contest)
      return errorResponse(res, "User not registered in the contest");

   for(let i = 0; i < contest.participant.length; i++) {
      if(contest.participant[i].participantID !== pid) continue;
      let score = contest.participant[i].score;
      logger.debug("Score" + score);
      return successResponse(res, "Score Retrival Successful", {data: {score}});
   }

   return errorResponse(res, "Participant could not be found in the contest");
}




exports.getSelfRank = async (req, res) => {
   let userData = req.userData;
   let {contestID} = req.body;

   logger.debug(contestID);

   let rankList = await generateLeaderboard(contestID);

   if(!rankList)
      return errorResponse(res, "Failed to retrive contest info.");

      
   let rank = 0;
   for(let i = 0; i < rankList.length; i++) {
      if(rankList[i].participantID.toString() === userData._id) {
         rank = i+1;
         break;
      }
   }

   if(rank === 0)
      return errorResponse(res, "User not found in the rankList");


   return successResponse(res, "Rank Retrived", {data: {rank}});
}



// Working
// user submits an ans
exports.submission = async(req, res) => {
   let {answer, contestID} = req.body;
   let userData = req.userData;

   logger.debug(answer, contestID);

   let contest = await Contest.findOne({_id: contestID});
   participants = contest.participant;
   
   
   if(!contest) 
      return errorResponse(res, "Contest not found");
   logger.debug("Contest received");


   let user = null;
   for(let i = 0; i < participants.length; i++) {
      if(participants[i].participantID === userData._id) {
         user = participants[i];
         break;
      }
   }

   if(user === null)
      return errorResponse(res, "User not registered in the contest");
   logger.debug("User Registration found.");

   if(!checkContestTime(contest))
      return errorResponse(res, "Submission Failed. The contest has ended");


   let question = null;
   let index = -1;

   for(let i = 0; i < contest.question.length; i++) {
      if(contest.question[i].qid === user.currentQues) {
         question = contest.question[i];
         index = i;
         break;
      }
   }

   if(index < 0)
      return successResponse(res, "All Questions Solved", {contestComplete: true, complete: false}, 300);
      
   
   answer = answer.toLowerCase();
   if(answer === question.answer) {
      user.score += question.awardPoints;
      user.currentQues = (index + 1 < contest.question.length ? contest.question[index+1].qid : null);
      user.lastSubmissionTime = new Date();
   }
   else  {
      logger.error("Incorrect ans");
      return errorResponse(res, "Incorrect Answer", null, 210);
   }

   logger.info("Correct Ans");
   let timeStamp = new Date();

   // update the database;
   const updateResponse = await Contest.updateMany({"participant._id": user._id}, 
   {"$set": 
      {
         "participant.$.score": user.score,
         "participant.$.currentQues": user.currentQues,
         "participant.$.lastSubmissionTime": timeStamp,

      }
   });

   if(!updateResponse)
      return errorResponse(res, "Failed to update the data")

   
   return successResponse(res, "Submission Successful");
}




// ------------------------ Admin Controller Functions --------------------------


exports.createContest = async(req, res) => {
   let data = req.body.contestData;

   // @TODO: data sanitation
   data.startTime = new Date(data.startTime);
   data.endTime = new Date(data.endTime);

   for(let i = 0; i < data.question.length; i++) {
      data.question[i].qid = uuid.v4();
   }

   let contest = new Contest(data);
   contest = await contest.save();
   
   if(!contest)
      return errorResponse(res, "Failed to create contest! Unknown error", {fatal: true});
      

   return successResponse(res, "Contest created successfully");
}




// ------------------- Testing -------------------------