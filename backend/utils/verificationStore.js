const redis = require("redis");

// Use the cloud Redis URL provided by your Redis Cloud provider.
// Alternatively, set the environment variable REDIS_URL.
const redisUrl = process.env.REDIS_URL || 'redis://default:9UKKJ4fPRJSFkW69tJnTVS35liSAcLPY@redis-18831.c273.us-east-1-2.ec2.redns.redis-cloud.com:18831';

const redisClient = redis.createClient({
  url: redisUrl
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Connect to Redis (async connection)
(async () => {
  await redisClient.connect();
})();

// Save a verification code for an email with an expiration of 10 minutes
const setVerificationCode = async (email, code) => {
  await redisClient.set(`verification:${email}`, code, { EX: 600 });
};

// Retrieve the stored verification code for an email
const getVerificationCode = async (email) => {
  return await redisClient.get(`verification:${email}`);
};

// Remove the verification code once used or expired
const removeVerificationCode = async (email) => {
  await redisClient.del(`verification:${email}`);
};

module.exports = { setVerificationCode, getVerificationCode, removeVerificationCode };
