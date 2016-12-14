const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  term: String,
  when: { type: Date, default: Date.now }
});

const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;
