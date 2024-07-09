const { Schema, model} = require('mongoose');

const appSchema = new Schema({
  name: { type: String, required: true },
  storyline: { type: String, required: true },
  summary: { type: String, required: true },
  price: { type: Number, required: true },
  cover: { type: String },
  genres: [{ type: String }]
});

const App = model('App', appSchema);
module.exports = App;
