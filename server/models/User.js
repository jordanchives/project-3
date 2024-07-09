const { Schema, model} = require('mongoose');

const userAppSchema = new Schema({
  app_id: { type: Schema.Types.ObjectId, ref: 'App', required: true },
  purchase_date: { type: Date, required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [userAppSchema] // Embedded document
});

const User = model('User', userSchema);
module.exports = User;
