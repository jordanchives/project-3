const { Schema, model} = require('mongoose');
const App = require('./Game');

const transactionGamesSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'App', required: true },
  price: { type: Number, required: true },
}, { _id: false });

const userTransactionSchema = new Schema({
  transaction_date: { type: Date, required: true },
  total: { type: Number, required: true },
  games: [transactionGamesSchema],
}, { _id: false });

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [{ type: Schema.Types.ObjectId, ref: 'App' }],
  transactions: [userTransactionSchema],
});

userSchema.pre('remove', function(next) {
  App.deleteMany({ _id: { $in: this.library } })
    .then(() => next());
});

const User = model('User', userSchema);
module.exports = User;
