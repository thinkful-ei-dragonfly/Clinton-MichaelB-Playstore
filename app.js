/* eslint-disable strict */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));

const playstore = require('./playstore');

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query;

  let results = playstore;

  if(sort) {
    if(!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app')
    }
}

  if(sort==='app') {
    results
      .sort((a, b) => {
        return a.App > b.App ? 1 : a.App < b.App ? -1 : 0;
      }); 
  } 

  if(sort==='rating') {
    results
      .sort((a, b) => {
        return a.Rating > b.Rating ? 1 : a.Rating < b.Rating ? -1 : 0;
      }); 
  } 
 
  if (genres) {
    if(!['Action', 'Adventure', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res
        .status(400)
        .send(`Genres must be 'Action', 'Adventure', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'`)
    }
  }
  if(genres) {
    results = playstore.filter(app => app.Genres === genres )
  }

  res.json(results);
  
});

module.exports = app;

// app.listen(8000, () => console.log('server listening on 8000'));