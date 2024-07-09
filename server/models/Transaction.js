const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  app_id: { type: Schema.Types.ObjectId, ref: 'App', required: true },
  transaction_date: { type: Date, required: true },
  amount: { type: Number, required: true },
});

const Transaction = model('Transaction', transactionSchema);
module.exports = Transaction;
