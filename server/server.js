const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require('./utils/auth');
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const startApolloServer = async () => {
    await server.start();
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server, {context: authMiddleware}));
    app.use(express.static(path.join(__dirname, '../client/build/')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
};

startApolloServer();
