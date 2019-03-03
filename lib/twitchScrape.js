// Dependencies
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

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
  axios
    .get('https://twitchtracker.com/ESL_SC2')
    .then(resulting => {
      let $ = cheerio.load(resulting.data);

      const totalHoursStreamed = $('#content-wrapper')
        .children()
        .eq(3)
        .children()
        .eq(0)
        .children()
        .eq(1)
        // .find('.g-x-s-value')
        .text();

      const niceTotalHoursStreamed = totalHoursStreamed
        .split('\n')
        .filter(item => item !== '')
        .map(item => parseInt(item));

      //FIXME
      const hoursStreamed = $('#content-wrapper')
        .children()
        .eq(0)
        .children()
        .eq(0) // gets text on level
        .children()
        .eq(0)
        // .find('.g-x-s-value')
        .text();

      const resObj = {
        // totalHoursStreamed: niceTotalHoursStreamed,
        totalHoursStreamed: niceTotalHoursStreamed[0],
        highestConcurViews: niceTotalHoursStreamed[2],
        totalSubs: niceTotalHoursStreamed[4],
        totalViews: niceTotalHoursStreamed[6]
      };

      console.log('resObj:', resObj);
      res.json(resObj);
    })
    .catch(err => console.log(err));
});

app.listen(PORT, function() {
  console.log('App running on port: ' + PORT + '!');
});
