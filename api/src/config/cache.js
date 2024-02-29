// redisClient.js
const redis = require('redis');

// Connect to Redis server
const client = redis.createClient({
  url: 'redis://redis:6379' // Default Redis URL
});
// const client = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT
// });
client.connect();

// Function to set a key-value pair in Redis with tracing and forced delay
async function setKeyValue(key, value) {
  try {
    await client.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting key ${key}:`, error);
  }
}
async function delCacheKey(key) {
  try {
    await client.del(key);
  } catch (error) {
    console.error(`Error setting key ${key}:`, error);
  }
}

// Function to get a value by key from Redis with tracing
async function getValueByKey(key) {
  try {
    const value = await client.get(key);
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error getting value for key ${key}:`, error);
  } 
}

module.exports = { setKeyValue, getValueByKey,delCacheKey };