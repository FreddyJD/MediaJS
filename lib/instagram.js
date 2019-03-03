const simpleInstagramScraper = require('simple-instagram-scraper');
module.exports = async function instagram(instaId) {
  const results = await simpleInstagramScraper.getReport(instaId);
  return results;
};

// This doesn't work, too old.
// const instagramAnalytics = require('instagram-analytics');

// instagramAnalytics('dashinjaninja')
//   .then(stats => {
//     console.log("I'm stats:", stats);
//   })
//   .catch(err => console.log(err));

