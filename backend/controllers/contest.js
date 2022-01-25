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
const User  = require("./../models/participant");


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
   let dbParticipants = contest.participant;

   if(!contest) return null;

   const handleTimeCompare = (a,b) => {
      let diff =  (a.submissionTime ? a.lastSubmissionTime.getTime() : Infinity) - (b.lastSubmissionTime ? b.lastSubmissionTime.getTime() : Infinity);
      return diff;
   }
   
   const handleScoreCompare = (a,b) => {
      if(a.score === b.score) return handleTimeCompare(a,b);
      return a.score > b.score ? -1 : 1;
   }
   
   dbParticipants.sort((p1, p2) => {
      return handleScoreCompare(p1, p2);
   });
    
   console.log(dbParticipants)
   return [contest.name, dbParticipants];
}

async function generateOverallLeaderboard() {
   let contests = await Contest.find({}, {participant: true, lastSubmissionTime: true, _id: false});
   if(!contests) {
      logger.error("Failed to fetch contest data in [generateOverallLeaderboard]");
      return null;
   }
   // let rankList = [{name: "Mitesh", score: 3}, {name: "Micky", score: 5}];
   // let index = rankList.findIndex((element, index) => {
   //    console.log(element)
   //    if(element.name === "Mitesh") return true;
   // });
   // console.log(index);



   let rankList = [];
   contests.forEach((contest) => {
      // console.log(contest)

      contest.participant.forEach((contestant) => {
         let index = rankList.findIndex((element) => {
            if(String(element.regNo) ===  String(contestant.regNo)) {
               return true;
            }
         });

         logger.info(index);

         if(index >= 0) {
            logger.warn("Entering for: " + rankList[index].regNo);
            // updating score
            console.log("Before: " + rankList[index].score);
            rankList[index].score += contestant.score;
            console.log("After: " + rankList[index].score);
            
            // updating latest submission
            if(!rankList[index].lastSubmissionTime) {
               rankList[index].lastSubmissionTime = new Date(contestant.lastSubmissionTime);
            } else {
               rankList[index].lastSumissionTime = (contestant.lastSubmissionTime && rankList[index].lastSubmissionTime.getTime() < contestant.lastSubmissionTime.getTime() ?  contestant.lastSubmissionTime : rankList[index].lastSubmissionTime);
            }
            // console.log(currLas)
         } else {
            // logger.warn("Pushing: ");
            // logger.warn(contestant);
            // logger.error("Current rankList");
            // logger.debug(rankList);
            rankList.push(contestant);
         }
      })

      logger.debug(rankList);
   });


   rankList.sort((c1, c2) => {
      if(c1.score === 0 && c2.score === 0) return -1;
      if(c1.score > c2.score) return -1
      else if(c2.score > c1.score) return 1;
      else {
         if(c1.lastSubmissionTime.getTime() <= c2.lastSubmissionTime.getTime()) return -1;
         else return 1;
      }
   })

   return rankList;
}

exports.getOverallLeaderboard = async (req, res) => {
   logger.debug("User Data: ");
   logger.debug(req.userData);
   let rankList = await generateOverallLeaderboard();
   if(!rankList)
      return res.status(300).send({message: "Failed to fetch the Leaderboard"})

   let index = rankList.findIndex((element) => {
      if(element.participantID === String(req.userData._id)) return true;
   })
   logger.debug("Rank: " + index );
   
   return successResponse(res,"Leaderboard generated successfully", {data: {rankList, rank: index + 1}});
}


function checkContestTime(contest) {
   let time = new Date();
   if(contest.endTime.getTime() < time.getTime()) return false;
   return true;
}

async function isValidContest(contestID) {
   if(!contestID || contestID === "") return false;
   let contest = await Contest.findOne({_id: contestID});
   
   if(!contest) return false;
   if(!checkContestTime(contest)) return false;
   return true;
}












// --------------------- Controller Functions --------------------------


// Returns the list of all active contest available for registration. If the user is already registered,
// it returns a errorResponse with code 300.

exports.getActiveContest = async (req, res) => {
   let {currentContest: contestID} = req.userData;
   logger.debug(req.userData);

   let valid = await isValidContest(contestID);
   logger.debug("Contest Valid: " + valid)
   // User already registered in a contest. Access to active contest list is not allowed in this case.
   if(valid) {
      logger.error("Already Registered")
      return errorResponse(res, "You are currently registered in an active contest, and thus cannot access other contests", null, 300);
   }
   
   logger.info("User eligible to fetch contest list.");
   
   // Fetch all the contests in the database
   let contests = await Contest.find({});
   if(!contests)
      return errorResponse(res, "Failed to fetch contests.", {fatal: true});

   // Filter out the passed out contests.
   let currTime = new Date();
   let contestList = [];
   for(let i = 0; i < contests.length; i++) {
      if(contests[i].endTime.getTime() < currTime.getTime()) continue;
      contestList.push(contests[i]);
   }

   logger.info("Contest List Retrieval Successful");
   return successResponse(res, "Contests successfully retrieved", {data: {contestList}});
}


// Working
// exports.getActiveContestList = async (req, res) => {
//    let {userData} = req;

//    // Do not return a list of active contest if user is already
//    // registered in a contest. Frontend uses this to get the list 
//    // to display the contests. This response indicates to show
//    // the already registered message to the user.
//    let valid = await isValidContest(userData.currentContest);
//    if(valid)
//       return errorResponse(res, "User already registered in a contest. (Multiple contest at a time is not supported for now) ", null, 300);

//    let contest = await Contest.find({});

//    if(!contest)
//       return errorResponse(res, "Invalid ContestID");
   
//    let contestList = [];
//    for(let i = 0; i < contest.length; i++) {
//       if(!checkContestTime(contest[i])) continue;

//       // Want registered mark?: No, not gonna support multiple contest for now
//       contestData = contest[i];
//       contestList.push(contestData);
//    }

//    return successResponse(res, "Contest data retrieved", {data: {contestList}});
// }


// Working
// exports.getContestList = async (req, res) => {
//    let {_id: userID} = req.userData;
//    const findFilter = {
//       _id: true,
//       name: true,
//       startTime: true,
//       endTime: true,
//       participant: true
//    }

//    let contest = await Contest.find({}, findFilter);
   
//    if(!contest) 
//    return errorResponse(res, "Contests could not be retrived.");
   
//    logger.debug("Got all contests");
   
//    // Marking registered contest in the data.
//    let contestList = [];
//    for(let i = 0; i < contest.length; i++) {
//       // if(contest[i].endTime.getTime() < currTime.getTime()) continue;
//       let registered = false;
//       for(let j = 0; j < contest[i].participant.length; j++) {
//          if(contest[i].participant[j].participantID === userID) registered = true;
//       }

//       let contestData = {
//          registered,
//          contest: contest[i]
//       };
//       contestList.push(contestData);
//    }

//    logger.info("Returning List. ")
//    return successResponse(res, "Contests Breif Retrieved", {data: {contestList}});
// }



// Working
exports.getRegisteredContest = async (req, res) => {
   // userData is a decoded json object processed in verifyAuth middleware
   // hence, the userID is always secure to pass into database.
   // let userID = req.userData._id;
   // let contests = await Contest.find({"participant.participantID": userID});
   let {currentContest: contestID} = req.userData;
   let contest = await Contest.findById(contestID);

   if(!contest) return errorResponse(res, "Registered Contest could not be retrived", {fatal: true});
   return successResponse(res, "Registered Contest Retrieved.", {data: {contest}});
}



// Working
exports.registerInContest = async (req, res) => {
   // let inputSchema = yup.object().shape({
   //    contestID: yup.string().min(1)
   // });


   let {contestID} = req.body;
   let {_id: userID, currentContest} = req.userData;
   let userData = req.userData;

   logger.debug(currentContest);
   // Preventing multiple contest registration
   let valid = await isValidContest(currentContest);
   if(valid) {
      logger.error(`User not eligible for registration: ${userData.name}`);
      return errorResponse(res, "User already registered in an active contest");
   }

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
      name: userData.name,
      regNo: userData.regNo,
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
   
   // update user
   let response = await User.updateOne({_id: userID}, { "$set": {currentContest: contestID} });
   if(!response)
      return errorResponse(res, "Something went wrong", {fatal: true});
   
   logger.info("Registration successful");
   return successResponse(res, "User registered successfully");
}



// Working
exports.getLeaderboard = async (req, res) => {
   let contestID = req.userData.currentContest;
   let userData = req.userData;
   // Cannot return a leaderboard to an invalid or inactive contest
   // let valid = await isValidContest(contestID);
   // if(!valid)
      // return errorResponse(res, "User not registered in an active contest", null, 300);

   let [contestName, rankList] = await generateLeaderboard(contestID);

   let rank = -1;
   for(let i = 0; i < rankList.length; i++) {
      if(String(rankList[i].participantID) === String(userData._id)) {
         rank = i+1;
         break;
      }
   }

   console.log(contestName);
   if(!rankList)
      return errorResponse(res, "Leaderboard could not be fetched!");
   
   return successResponse(res, "Leaderboard fetched", {data: {contestName, rankList, rank}});
}


exports.getCombinedLeaderboard = async () => {
   // Return a combined leaderboard from all the contests.
}



// Working
exports.getSelfPoints = async (req, res) => {
   let {currentContest: contestID} = req.userData;
   let pid = req.userData._id; 
   
   let valid = await isValidContest(contestID);
   if(valid)
      return errorResponse(res, "User not registered in an active contest", null, 300);
    
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
   let {currentContest: contestID} = userData;

   let valid = await isValidContest(contestID);
   if(!valid)
      return errorResponse(res, "User not registered in an active contest", null, 300);

   let rankList = await generateLeaderboard(contestID);

   if(!rankList)
      return errorResponse(res, "Failed to retrive contest info.");

      
   let rank = 0;
   for(let i = 0; i < rankList.length; i++) {
      if(String(rankList[i].participantID) === String(userData._id)) {
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
   let {answer} = req.body;
   let userData = req.userData;
   let {currentContest: contestID} = userData;

   let contest = await Contest.findOne({_id: contestID});
   participants = contest.participant;
   
   
   if(!contest) 
      return errorResponse(res, "Contest not found");
   logger.debug("Contest received");


   let user = null;
   for(let i = 0; i < participants.length; i++) {
      if(String(participants[i].participantID) === String(userData._id)) {
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
      logger.error(`Incorrect ans: ${userData.name}`);
      return errorResponse(res, "Incorrect Answer", null, 210);
   }

   logger.debug("User Contents: ");
   logger.debug(user);

   logger.info(`Correct ans: ${user.name}`);
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
      return errorResponse(res, "Failed to update the data", {fatal: true});

   
   return successResponse(res, "Submission Successful");
}

exports.getCurrentQuestion =  async (req, res) => {
   let {userData} = req;
   let {_id: userID} = userData;
   let currTime = new Date();

   // Fetching user data to get current contest
   logger.debug("Fetching user")
   let user = await User.findById(userID);
   if(!user)
      return errorResponse(res, "Invalid User", {fatal:true});

   // Checking if the contest is valid
   logger.debug("Checking contest")
   let valid = await isValidContest(userData.currentContest);
   if(!valid) {
      return errorResponse(res, "You either haven't registered or the contest has ended.", null, 300);
   }
   
   // Fetching contest details
   logger.debug("Fetching contest")
   let contest = await Contest.findById(user.currentContest);
   if(!contest)
      return errorResponse(res, "Could not fetch contest", {fatal: true});

   if(contest.startTime.getTime() > currTime.getTime())
      return errorResponse(res, "Contest has not started yet.");

   // Finding the current question for the user
   logger.debug("Finding question")
   let currentQues = null;
   for(let i = 0; i < contest.participant.length; i++) {
      let contestant = contest.participant[i];
      if(String(contestant.participantID) === String(userID)) {
         currentQues = contestant.currentQues;
         break;
      }
   }

   if(!currentQues)
      return successResponse(res, "All questions are answered", {end:true, complete: false, data: {endCredit: contest.endCredit}}, 200);

   // Fetching the current question details.
   logger.debug("Fetching question")
   let question = null;
   for(let i = 0; i < contest.question.length; i++) {
      let q = contest.question[i];
      if(String(q.qid) === String(currentQues)) {
         question = q;
         break;
      }
   }

   if(!question) 
      return errorResponse(res, "Failed to fetch Question", {fatal: true});

   // Found the question details.
   logger.debug("Question retrieved succesfully")
   return successResponse(res, "Question Fetched successfully", {data: {question}});
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