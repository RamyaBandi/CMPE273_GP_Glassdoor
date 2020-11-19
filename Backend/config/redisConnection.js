const redis = require("redis");

const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
});

redisClient.on("connect", (err) => {
    if (err) {
        console.log("Error while connecting to Redis server");
    }
    else {
        console.log("Redis Server Connected");
    }
});

module.exports = redisClient;