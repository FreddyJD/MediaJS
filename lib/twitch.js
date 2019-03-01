const KEY = process.env.TWITCH_API;
const request = require('request');
const axios = require('axios');
require('dotenv').config();

const TwitchClient = require('twitch').default;
const clientId = process.env.TWITCH_CLIENTID
const accessToken = process.env.TWITCH_ACCESSTOKEN;
const twitchClient = TwitchClient.withCredentials(clientId, accessToken);

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, err => {
  if (err) throw err;
  console.log('Listening on port: ', PORT);
  isStreamLive('ccncdota2');

});

// const client = new TwitchClient();
// const channel = client.channels.getMyChannel();
// console.log("I'm channel", channel);

('https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=fxamuyd9eulklmxwzqho3sfglk714h&redirect_uri=http://localhost:3000&scope=channel:read:subscriptions');

async function isStreamLive(userName) {
  const user = await twitchClient.users.getUserByName(userName);
  if (!user) {
    return console.log(false);
  }
  return console.log(
    "I'm inside isStreamLive: ",
    (await user.getStream()) !== null
  );
}

// channelInfo().catch(err => console.log(err));

// var headers = {
//   'Client-ID': ''
// };

// var options = {
//   url: 'https://api.twitch.tv/helix/streams?game_id=33214',
//   headers: headers
// };

// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log("I'm the body:", body);
//   } else {
//     console.log('This is the error:', response);
//   }
// }

// request(options, callback);

// const data = {
//   'Client-ID': KEY
// };

// axios
//   .post(
//     'https://api.twitch.tv/helix/streams?game_id=33214',
//     JSON.stringify(data)
//   )
//   .then(response => {
//     console.log(response.data);
//     console.log('userresponse ' + response.data.access_token);
//   })
//   .catch(error => {
//     console.log('error ' + error);
//   });
// const AuthStr = 'Bearer '.concat(USER_TOKEN);
// axios
//   .get('https://api.twitch.tv/helix/streams?game_id=33214', {
//     headers: { Authorization: KEY }
//   })
//   .then(response => {
//     // If request is good...
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log('error 3 ' + error);
//   });
