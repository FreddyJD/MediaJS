# Social Media JS

This is an NPM module that grabs data from different API's and make's it readeble

## YouTube API

Promise Example

```

const { YouTube } = require('socialmediajs');

__Test__();

function __Test__() {
  YouTube("UCBUVGPsJzc1U8SECMgBaMFw", "YOUR_API_KEY").then(data => {
    console.log(data);
  });
}


```

Async/await Example

```
const { YouTube } = require('socialmediajs');

async function __test(channelID, apiKey) {
    const data = await YouTube(channelID, apiKey);
    console.log(data)
    return data
}

__test('A CHANNEL ID', ' YOUR YOUTUBE API KEY');


```

## Twitch Scrapper

Promise Example

```
const { Twitch } = require('./app')

function ybicaStats() {
Twitch('ybicanoooobov').then((results) => {
  console.log(results)
})
}

ybicaStats()
```

Async/Await Example

```
const { Twitch } = require('./app'

async function ybicaStats() {
  const results = await Twitch('ybicanoooobov')
  console.log(results)
}

ybicaStats()
```
