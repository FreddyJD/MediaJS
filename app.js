const YouTube = require('./lib/youtube')
const Twitch = require('./lib/twitchScrape')
require('dotenv').config()

module.exports = {
  YouTube: async (channelID, key) => await YouTube(channelID, key, 5),
  Twitch: async liveChannel => await Twitch(liveChannel),
}
