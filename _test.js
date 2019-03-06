const { YouTube, Twitch } = require('./app')

// __Test__()
__Test__Twitch("ybicanoooobov")

function __Test__() {
  YouTube('UCBUVGPsJzc1U8SECMgBaMFw', 'YOUR_API_KEY').then(data => {
    console.log(data)
  })
}

async function __Test__Twitch(whatever) {
  const data = await Twitch(whatever)

  console.log('Twitch Data:')
  return console.log("Data:",data)
}
