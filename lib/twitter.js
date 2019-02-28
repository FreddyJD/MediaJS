var ogs = require('open-graph-scraper');
var options = {
  url: 'https://twitter.com/elonmus',
  followAllRedirects: true,
  maxRedirects: 20
};
ogs(options)
  .then(function(result) {
    console.log('result:', result);
  })
  .catch(function(error) {
    console.log('error:', error);
  });
