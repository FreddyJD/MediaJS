const KEY = process.env.TWITCH_API;
const request = require('request');
const axios = require('axios');

const TwitchClient = require('twitch').default;
const clientId = '123abc';
const accessToken = 'def456';
const twitchClient = TwitchClient.withCredentials(clientId, accessToken);

async function isStreamLive(userName) {
  const user = await twitchClient.users.getUserByName(userName);
  if (!user) {
    return false;
  }
  return (await user.getStream()) !== null;
}

const channel = await client.channels.getMyChannel();

// var headers = {
//   'Client-ID': 'p0gch4mp101fy451do9uod1s1x9i4a'
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
