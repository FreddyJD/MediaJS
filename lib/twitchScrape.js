// Dependencies
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.MONGODB_URI || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/scrape', (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://twitchtracker.com/ESL_SC2');
    await page.screenshot({ path: 'example.png' });
    const content = await page.content();

    let $ = cheerio.load(content);

    const totalHoursStreamed = $('#content-wrapper')
      .children()
      .eq(3)
      .children()
      .eq(0)
      .children()
      .eq(1)
      // .find('.g-x-s-value')
      .text();

    console.log('totalHoursStreamed');
    console.log(totalHoursStreamed);

    const niceTotalHoursStreamed = totalHoursStreamed
      .split('\n')
      .filter(item => item !== '')
      .filter((item, i) => {
        if (i === 0 || i % 2 === 0) {
          return item;
        }
      })
      .map(item => item.split(','))
      .map(item => item.join(""))
      .map(item => parseInt(item));

    console.log('niceTotalHoursStreamed:');
    console.log(niceTotalHoursStreamed);

    const hoursStreamed = $('#performance-panel')
      .children()
      .eq(0)
      .find('div.g-x-s-value');
    // .text();

    // console.log('hoursStreamed', hoursStreamed);
    // .children()
    // .eq(0)
    // .children()
    // .eq(0) // gets text on level
    // .children()
    // .eq(0)
    // // .find('.g-x-s-value')
    // .text();

    const resObj = {
      // totalHoursStreamed: niceTotalHoursStreamed,
      totalHoursStreamed: niceTotalHoursStreamed[0],
      highestConcurViews: niceTotalHoursStreamed[1],
      totalSubs: niceTotalHoursStreamed[2],
      totalViews: niceTotalHoursStreamed[3]
      // hoursStreamed: hoursStreamed
    };

    console.log('resObj:', resObj);
    res.json(resObj);

    await browser.close();
  })();

  // axios
  //   .get('https://twitchtracker.com/ESL_SC2')
  //   .then(resulting => {
  // let $ = cheerio.load(resulting.data);

  // const totalHoursStreamed = $('#content-wrapper')
  //   .children()
  //   .eq(3)
  //   .children()
  //   .eq(0)
  //   .children()
  //   .eq(1)
  //   // .find('.g-x-s-value')
  //   .text();

  // const niceTotalHoursStreamed = totalHoursStreamed
  //   .split('\n')
  //   .filter(item => item !== '')
  //   .map(item => parseInt(item));

  //     //FIXME
  //     // #performance-panel > div:nth-child(1) > div.g-x-s-value.g-x-s-contrast > div:nth-child(1) > div:nth-child(2)
  //     const hoursStreamed = $('#performance-panel')
  //       .children()
  //       .eq(0)
  //       .find('div.g-x-s-value');
  //     // .text();

  //     console.log('hoursStreamed', hoursStreamed);
  //     // .children()
  //     // .eq(0)
  //     // .children()
  //     // .eq(0) // gets text on level
  //     // .children()
  //     // .eq(0)
  //     // // .find('.g-x-s-value')
  //     // .text();

  // const resObj = {
  //   // totalHoursStreamed: niceTotalHoursStreamed,
  //   totalHoursStreamed: niceTotalHoursStreamed[0],
  //   highestConcurViews: niceTotalHoursStreamed[2],
  //   totalSubs: niceTotalHoursStreamed[4],
  //   totalViews: niceTotalHoursStreamed[6],
  //   hoursStreamed: hoursStreamed
  // };

  // console.log('resObj:', resObj);
  // res.json(resObj);
  // })
  // .catch(err => console.log(err));
});

app.listen(PORT, function() {
  console.log('App running on port: ' + PORT + '!');
});
