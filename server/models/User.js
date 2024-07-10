const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const Game = require("./Game");

const transactionGamesSchema = new Schema(
  {
    game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const userTransactionSchema = new Schema(
  {
    transaction_date: { type: Date, required: true },
    total: { type: Number, required: true },
    games: [transactionGamesSchema],
  },
  { _id: false }
);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  transactions: [userTransactionSchema],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("remove", function (next) {
  Game.deleteMany({ _id: { $in: this.library } }).then(() => next());
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
module.exports = User;
