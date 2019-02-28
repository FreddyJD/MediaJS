const simpleInstagramScraper = require('simple-instagram-scraper');
module.exports = async function instagram(instaId) {
  const results = await simpleInstagramScraper.getReport(instaId);
  return results;
};
