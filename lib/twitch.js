const KEY = process.env.TWITCH_API;
const request = require('request');
const axios = require('axios');
require('dotenv').config();

const TwitchClient = require('twitch').default;
// const clientId = process.env.TWITCH_CLIENTID;
// const accessToken = process.env.TWITCH_ACCESSTOKEN;
// const client = TwitchClient.withCredentials(clientId, accessToken);

// const { AccessToken } = require('twitch')

const clientId = process.env.TWITCH_CLIENTID;
const accessToken = process.env.TWITCH_ACCESSTOKEN_FLOW;
const clientSecret = process.env.TWITCH_KEY;
const refreshToken = '999999';
const client = TwitchClient.withCredentials(clientId, accessToken, {
  clientSecret,
  refreshToken,
  onRefresh: token => {
    // do things with the new token data, e.g. save them in your database
    console.log("I'm a token!:", token);
  }
});

// `curl -H "Authorization: OAuth <access token>" https://id.twitch.tv/oauth2/validate`// to get the code
// `https://id.twitch.tv/oauth2/authorize?client_id=fxamuyd9eulklmxwzqho3sfglk714h&redirect_uri=http://localhost:3000&response_type=token&scope=channel:read:subscriptions`;

// // To get the real access token
// `https://id.twitch.tv/oauth2/token?client_id=fxamuyd9eulklmxwzqho3sfglk714h&client_secret=5o8r8s3aqlfy7xuqm0pyugdw5d47ch&code=c2yevhx52j5dm9xv1waq5r8iag8np9&grant_type=authorization_code&redirect_uri=http://localhost:3000`;

const express = require('express');
const app = express();
const PORT = 3000;

async function testing() {
  const channel = await client.channels.getMyChannel();
  const subscriptions = await client.channels.getChannelSubscriptions(channel);
  console.log("I'm subscriptions", subscriptions);
}

testing();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(
  'https://id.twitch.tv/oauth2/authorize?client_id=fxamuyd9eulklmxwzqho3sfglk714h&redirect_uri=http://localhost:3000&response_type=token&scope=channel:read:subscriptions',
  (req, res) => {
    console.log(req.body);
    res.send(req.body);
  }
);

app.post(
  'https://id.twitch.tv/oauth2/token?client_id=fxamuyd9eulklmxwzqho3sfglk714h&client_secret=5o8r8s3aqlfy7xuqm0pyugdw5d47ch&code=c2yevhx52j5dm9xv1waq5r8iag8np9&grant_type=authorization_code&redirect_uri=http://localhost:3000',
  (req, res) => {
    console.log(req.body);
    res.send(req.body);
  }
);

app.listen(PORT, err => {
  if (err) throw err;
  console.log('Listening on port: ', PORT);
  isStreamLive('ccncdota2');
});

// const client = new TwitchClient();
// const channel = client.channels.getMyChannel();
// console.log("I'm channel", channel);

('https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=fxamuyd9eulklmxwzqho3sfglk714h&redirect_uri=http://localhost:3000&scope=channel:read:subscriptions');

async function isStreamLive(userName) {
  const user = await client.users.getUserByName(userName);
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
