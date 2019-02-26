const YouTube = require('./lib/youtube'); 
require("dotenv").config()

module.exports = async function data(channelID, key, amountVideos) {
  const data = await YouTube(channelID, key, amountVideos); 
  return data; 
}