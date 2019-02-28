var api = require('twitch-api-v5');
 
api.clientID = 'Twitch app client-id';
 
api.user.getByID({ userID: '12826' }, (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log(res);
        /* Example response
        {
            display_name: 'Twitch',
            _id: '12826',
            name: 'twitch',
            type: 'user',
            ...
        }
        */
    }
});
 
api.feed.createPost({ auth: 'OAuth ...', channelID: '12826', post: 'New Post!' }, (err, res) => {
    ...
});