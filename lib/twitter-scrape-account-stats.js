var getAccountStats = require('twitter-scrape-account-stats').getAccountStats;

getAccountStats({ username: 'slang800' }).then(function(account) {
  console.log(account.username + ' has ' + account.followers + ' followers.');
  console.log('Whole object:', account);
});

/* twitter-scrape-account-stats delivers:
{
  description,
  name,
  userId,
  username,
  following,
  followers,
  posts
}
*/
