const Redis = require("redis");
const logger = require("node-color-log");

const client = Redis.createClient({
   url: process.env.REDIS_SERVER,
   password: process.env.REDIS_PASS
});

client.on("error", (err) => {
   logger.error("Failed to connect to redis server: ");
   logger.error(err);
})

module.exports = client;