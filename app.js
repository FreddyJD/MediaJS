const api = require('./lib/youtube'); 
require("dotenv").config()

// Data
const key = process.env.YT_KEY; 
const channelID = 'UCA9UvBiKHly15rN8u_Km3BQ';
const amountVideos = 5;
api(channelID, key, amountVideos).then( data => {
  console.log(data);
});


// Test();