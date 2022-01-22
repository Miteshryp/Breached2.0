const Meta = require("./../models/metadata");
const logger = require("node-color-log");

exports.getContestDescription = async (req, res) => {
   const desc = await Meta.find({});
   logger.debug(desc);
   if(desc === null || desc === undefined)
      return res.status(300).send({message: "Error fetching description", complete: false});

   logger.info("Description successfully fetched");
   return res.status(200).send({message: "Description Fetched", complete: true, data: {description: desc} });
}

exports.setContestDescription = async(req, res) => {
   logger.log(req.body.description)
   let model = new Meta({
      dashboardDescription: req.body.description
   });


   let response = await model.save();
   if(!response)
      return res.status(300).send({message: "Error updating description", complete: false});
   return res.status(200).send({message: "Description inserted successfully"});
}
