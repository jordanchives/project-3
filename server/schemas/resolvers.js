const { User, Game } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    games: async (parent, { name }) => {
      const params = name ? { name } : {};
      return Game.find(params);
    },
    game: async (parent, { thoughtId }) => {
      return Game.findOne({ _id: thoughtId });
    },
    transactions: async () => {
        return User.find().populate('transactions');
    },
    transaction: async (parent, { transactionId }) => {
        return User.findOne({ _id: transactionId }).populate('transactions');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
  },
};

module.exports = resolvers;
