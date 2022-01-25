const logger = require("node-color-log");
const redis = require("./../utils/redis-client");

function createRateLimiter(prefix, ratelimit) {
   const rateLimiter = async (req, res, next) => {
      let {userData} = req;
      const expireTime = Number(process.env.REDIS_EXPSECS);

      let userCacheKey = prefix + String(userData.regNo);
      let userttl = await redis.ttl(userCacheKey);

      if(userttl < 0) {
         logger.warn("Creating new expiring key: " + userCacheKey)
         await redis.setEx(userCacheKey, expireTime, "1");
         next();
      }
      else {
         let value = await redis.get(userCacheKey);
         logger.debug("Rate Limiter: " + value);

         // Rate limit exceeded
         if(value >= ratelimit) {
            logger.error("Rate limit Exceeded");
            return res
               .status(500)
               .send({
                  message: "Rate Limit Reached. Please wait for a while",
                  complete: false
               });   
         }
         else {
            await redis.incr(userCacheKey);
            next();
         }
      }
   }
   return rateLimiter;
}

module.exports = {createRateLimiter};