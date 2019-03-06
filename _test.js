const { YouTube, Twitch } = require('./app')

// __Test__();
// __Test__Twitch()

function __Test__() {
  YouTube('UCBUVGPsJzc1U8SECMgBaMFw', 'YOUR_API_KEY').then(data => {
    console.log(data)
  })
}


async function showMeTheMoney() {
  const results = await Twitch("ybicanoooobov")
  console.log(results)
}

showMeTheMoney()