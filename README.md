# Social Media JS
This is an NPM module that grabs data from different API's and make's it readeble 

###YouTube API
Promise Example
```

const { YouTube } = require("./app");

__Test__();

function __Test__() {
  YouTube("UCBUVGPsJzc1U8SECMgBaMFw", "YOUR_API_KEY").then(data => {
    console.log(data);
  });
}


```

Async/await Example
```

async function __test(channelID, apiKey) {
    const data = await YouTube(channelID, apiKey);
    console.log(data)
    return data
} 

__test('A CHANNEL ID', ' YOUR YOUTUBE API KEY');


```
