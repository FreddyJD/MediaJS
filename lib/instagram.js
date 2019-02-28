const {
  getMediaByCode,
  getUserByUsername,
  getMediaByLocation,
  getMediaByTag,
  getMediaLikesByCode,
  getMediaCommentsByCode,
  getUserFollowers,
  getUserFollowing,
  getUserMediaAdvanced,
  generalSearch,
  getUserIdFromUsername 
} = require('./index');



const simpleInstagramScraper = require('simple-instagram-scraper');
var ig = require('instagram-scraping');

async function go() {
  await simpleInstagramScraper
    .getReport('dashinjaninja')
    .then(results => {
      const test = {
        data: results
      };
      console.log('Reporting in:', test.data);
      return results;
    })
    .catch(err => console.log(err));
}

go();

ig.scrapeTag('veranda')
  .then(function(result) {
    console.dir('IG result:', result);
  })
  .catch(err => console.log(err));

  getUserByUsername('instagram').then(({ user }) => {
    console.log(user.id)
  })
  
  getUserIdFromUsername('instagram').then(({ id }) => {
    console.log(id)
  })
  
  getMediaByCode('BUu14BdBkO5').then(media => {
    console.log(media)
  })
  
  getMediaByLocation('292188415').then(({ location }) => {
    console.log(location.name)
  })
  
  getMediaByTag('abcd').then((media) => {
    console.log(media)
  })
  
  getMediaLikesByCode('BUu14BdBkO5', '50').then((media) => {
    console.log(media)
  })
  
  getUserFollowers('25025320').then((list) => {
    console.log(list)
  })
  
  getUserFollowing('25025320').then((list) => {
    console.log(list)
  })
  
  getUserMediaAdvanced('25025320', 24).then((user) => {
    console.log(user)
  })
  
  generalSearch('insta').then((results) => {
    console.log(results)
  })
  