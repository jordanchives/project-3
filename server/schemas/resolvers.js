const { User, Game } = require('../models');
const { findById } = require('../models/Game');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // return all users
    users: async () => {
      return User.find();
    },
    // return a single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    // return all games
    games: async (parent) => {
      return Game.find();
    },
    // return a single game by ID
    gameById: async (parent, { gameId }) => {
      return Game.findById(gameId);
    },
    // return a single game by name
    gameByName: async (parent, { name }) => {
      return Game.findOne({ name: { $regex: name, $options: 'i' } });
    },
    // return all games by genre
    gamesByGenre: async (parent, { name }) => {
      return Game.find({ genres: { $regex: name, $options: 'i' } });
    },
    // return all transactions for a single user
    transactions: async (parent, { userId }) => {
      const user = await User.findById(userId);
      return user.transactions;
    },
    // return a single transaction by ID
    // transaction: async (parent, { userId, transactionId }) => {
    //   const user = await User.findById(userId);
    //   return user.transactions.findOne({ transactionId });
    // },
  },

  Mutation: {
    // add a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      if (!user) {
        throw new AuthenticationError('User was not created!');
      }
      return { token, user };
    },
    // login a user
    login: async (parent, { username, password }) => {
      const user = await User.findOne(username);

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.comparePassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    // new transaction, also adds games to user's library
    addTransaction: async (parent, { userId, games }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      let total = 0;
      const transactionGames = [];
      for (let i = 0; i < games.length; i++) {
        if (user.library.includes(games[i])) {
          throw new Error('You already own this game!');
        }
        const game = await Game.findById(games[i]);
        total += game.price;
        transactionGames.push({ game: game._id, price: game.price });
      }
      const transaction = { total: total, games: transactionGames };
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { transactions: transaction, library: { $each: games } } }
      );
      return transaction;
    },
  },
};

module.exports = resolvers;

