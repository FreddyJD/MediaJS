const YouTube = require('./lib/youtube')
// const instagram = require('./lib/instagram');
const Twitch = require('./lib/twitchScrape')
require('dotenv').config()

module.exports = {
  YouTube: async (channelID, key) => await YouTube(channelID, key, 5),
  // Instagram: async (instaId) => (await simpleInstagramScraper.getReport(instaId)),

  Twitch: async (liveChannel) => await Twitch(liveChannel),
}
