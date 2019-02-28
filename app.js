const YouTube = require('./lib/youtube');
const instagram = require('./lib/instagram');
require('dotenv').config();

module.exports = {
  youtube: async function data(channelID, key, amountVideos) {
    const data = await YouTube(channelID, key, amountVideos);
    return data;
  },
  instagram: async function instagram(instaId) {
    const results = await simpleInstagramScraper.getReport(instaId);
    return results;
  }
};
