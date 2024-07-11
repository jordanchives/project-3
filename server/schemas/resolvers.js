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
    games: async (parent) => {
      return Game.find();
    },
    game: async (parent, { name }) => {
      return Game.findOne({ name });
    },
    genre: async (parent, { name }) => {
      return Game.find({ genres: { $in: [name] } });
    },
    transactions: async (parent, { userId }) => {
      const user = User.findById(userId);
      console.log(user.username);
      return user.transactions;
    },
    transaction: async (parent, { _id }) => {
      return Transaction.findOne({ _id });
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