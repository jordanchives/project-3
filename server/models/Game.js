const { Schema, model} = require('mongoose');

const gameSchema = new Schema({
  name: { type: String, required: true },
  storyline: { type: String, required: true },
  summary: { type: String, required: true },
  price: { type: Number, required: true },
  cover: { type: String },
  genres: [{ type: String }]
});

const Game = model('Game', gameSchema);
module.exports = Game;
