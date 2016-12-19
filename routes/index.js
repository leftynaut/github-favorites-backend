const express = require('express');
const router = express.Router();

const Favorites = require('../models/favorites');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api', (req, res) => {
  Favorites.find({}).then(results => {
    results = results.map(result => {
      return result.term
    })
    res.send(results);
  });
});

router.post('/api/:term(*)', (req, res) => {
  const term = req.params.term.toLowerCase()
  Favorites.find({ term }).exec()
    .then(ans => {
      if (ans.length > 0) {
        res.send('Already in DB')
      } else {
        new Favorites({ term }).save();
        res.send('Added');
      }
    })
    .catch((err) => {
      res.send(err)
    })
});

router.delete('/api/:term(*)', (req, res) => {
  const term = req.params.term.toLowerCase()
  Favorites.find({ term }).remove().exec();
  res.send('Removed');
});

module.exports = router;
