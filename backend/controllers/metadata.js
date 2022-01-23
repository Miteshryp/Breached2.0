const Meta = require("./../models/metadata");
const logger = require("node-color-log");

exports.getContestDescription = async (req, res) => {
   const desc = await Meta.find({});
   logger.debug(desc);
   if(desc === null || desc === undefined)
      return res.status(300).send({message: "Error fetching description", complete: false});

   let activeDesc = null;
   for(let i = 0; i < desc.length; i++) {
      if(desc[i].active){
         activeDesc = desc[i]
         break;
      }
   }

   if(activeDesc === null) {
      logger.error("No metadata active");
      return res.status(200).send({message: "No metadata active", complete: true, data: {description: []}});
   }
   
   logger.warn(activeDesc.dashboardDescription)
   logger.info("Description successfully fetched");
   return res.status(200).send({message: "Description Fetched", complete: true, data: {description: activeDesc.dashboardDescription} });
}

exports.setContestDescription = async(req, res) => {
   logger.log(req.body.description)
   let model = new Meta(req.body);


   let response = await model.save();
   if(!response)
      return res.status(300).send({message: "Error updating description", complete: false});
   return res.status(200).send({message: "Description inserted successfully"});
}
