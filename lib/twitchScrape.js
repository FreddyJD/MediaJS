// Dependencies
const express = require('express')
const cheerio = require('cheerio')
const path = require('path')
const puppeteer = require('puppeteer')

const app = express()
const PORT = process.env.MONGODB_URI || 3000

async function launch () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:3000/scrape`)
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

function callback (items) {
  return items
}

module.exports = async function Twitch(liveChannel, callback) {
  // Route
  app.get('/scrape', (req, res) => {
    try {
    // Puppeteer mocks page load: because target site built with reactJS
      ;(async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://twitchtracker.com/${liveChannel}`)
        const content = await page.content()

        let $ = cheerio.load(content)

        // Summary Panel Scrape
        const totalHoursStreamed = $('#content-wrapper')
          .children()
          .eq(3)
          .children()
          .eq(0)
          .children()
          .eq(1)
          .text()

        // Performance Panel Scrape
        const hoursStreamed = $('#performance-panel')
          .children()
          .text()

        //Data Transformation

        // Text indices in arry hoursStreamed
        let spread = [2, 5, 8, 11, 14, 17, 20, 23]

        // Summary Transform
        const summaryHoursStreamed = totalHoursStreamed
          .split('\n')
          .filter(item => item !== '')
          .filter((item, i) => {
            if (i === 0 || i % 2 === 0) {
              return item
            }
          })
          .map(item => item.split(','))
          .map(item => item.join(''))
          .map(item => parseInt(item))

        // Performance Tab Transform
        // Raw Performance/Week
        const performance = hoursStreamed
          .split('\n')
          .map(item => item.trim())
          .filter(item => item !== '')
          .filter((item, i) => {
            if (!spread.includes(i)) {
              return item
            }
          })
          .filter((item, i) => {
            if (i !== 0 && i % 2 !== 0) {
              return item
            }
          })
          .map(item => item.split(','))
          .map(item => item.join(''))
          .map(item => parseInt(item))

        // Raw Performance Delta/Week
        const performanceDelta = hoursStreamed
          .split('\n')
          .map(item => item.trim())
          .filter(item => item !== '')
          .filter((item, i) => {
            if (!spread.includes(i)) {
              return item
            }
          })
          .filter((item, i) => {
            if (i === 0 || i % 2 === 0) {
              return item
            }
          })
          .map(item => item.split(','))
          .map(item => item.join(''))
          .map(item => parseInt(item))

        const weeklyDelta = {
          hoursStreamedDelta: performanceDelta[0],
          avgViewsDelta: performanceDelta[1],
          peakViewsDelta: performanceDelta[2],
          hoursWatchDelta: performanceDelta[3],
          subGainsDelta: performanceDelta[4],
          subsPerHourDelta: performanceDelta[5],
          viewGainsDelta: performanceDelta[6],
          viewPerHourDelta: performanceDelta[7],
        }

        const weeklyTotals = {
          hoursStreamed: performance[0],
          avgViews: performance[1],
          peakViews: performance[2],
          hoursWatched: performance[3],
          subGains: performance[4],
          subsPerHour: performance[5],
          viewGains: performance[6],
          viewPerHour: performance[7],
        }

        // All Time Totals for channel
        const totals = {
          totalHoursStreamed: summaryHoursStreamed[0],
          highestConcurViews: summaryHoursStreamed[1],
          totalSubs: summaryHoursStreamed[2],
          totalViews: summaryHoursStreamed[3],
          weeklyDelta: weeklyDelta,
          weeklyTotals: weeklyTotals,
        }
        // console.log(totals)
        // res.send(totals)
        function callback(items) {
          return items
        }
        callback(totals) 
        await browser.close()
      })()
    } catch (error) {
      console.error(error)
    }
  })


}

if (app.listen(PORT, function () {
  console.log('App running on port: ' + PORT + '!')
})) {
  launch()

} else {
  console.log("server didn't launch")
}