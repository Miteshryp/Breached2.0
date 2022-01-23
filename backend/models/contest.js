const mongoose = require("mongoose");

// user schema will have a list of contest it is participating in
// contest schema will have the same

// contest schema will have
// starting time
// ending time
// list of questions along with their ans, hints, image and statement.
// list of participant along with their submission and time of submission

const schema = {
   name:  {
      required: true,
      type: String,
   },
   startTime: {
      required: true,
      type:Date
   },
   endTime: {
      required: true,
      type:Date
   },

   participant: [{
      participantID: {
         type: String,
         required: true
      },
      name: String,
      regNo: String,
      score: Number,
      lastSubmissionTime: Date, // size will be same as the questions
      currentQues: String
   }],

   question:{
      required: true,
      type: [{
         qid: String,
         title: String,
         statement: [{type: String}],
         answer: String,
         awardPoints: Number,
         clueMedia: [{
            url: String,
            contentType: String
         }],
      }]
   },

   endCredit: [{type:String}]

};

const modelSchema = new mongoose.Schema(schema);
const model = mongoose.model("contest", modelSchema);

module.exports = model;