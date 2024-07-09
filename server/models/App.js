const { Schema, model} = require('mongoose');

const appSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cover_image_url: { type: String },
  genres: [{ type: String }]
});

const App = model('App', appSchema);
module.exports = App;
