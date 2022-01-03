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
      participantID: mongoose.Types.ObjectId,
      score: Number,
      submissionTime: [{type: Date}], // size will be same as the questions
      currentQues: Number
   }],

   question:{
      required: true,
      type: [{
         qid: Number,
         statement: String,
         answer: String,
         awardPoints: Number,
         img: {
            data: Buffer,
            contentType: String
         },
         hints: [{type: String}]
      }]
   },

};

const modelSchema = new mongoose.Schema(schema);
const model = mongoose.model("contest", modelSchema);

module.exports = model;