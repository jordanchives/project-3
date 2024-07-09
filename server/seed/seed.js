const db = require("../config/connection.js");
const { User, App } = require("../models/index.js");
const clearDB = require("./clearDB.js");
const getGamesData = require("./games.js");
const usersData = require("./users.js");

function createTransaction(apps) {
  return {
    transaction_date: new Date(),
    total: apps.reduce((acc, app) => acc + app.price, 0),
    apps: apps.map((app) => {
      return {
        app: app._id,
        price: app.price,
      };
    }),
  };
}

db.once("open", async () => {
  try {
    await clearDB("User", "users");
    await clearDB("App", "apps");

    const gamesData = await getGamesData();
    console.log("Fetched Games Data:", gamesData); // Debug log
    const createdGames = await App.collection.insertMany(gamesData);
    const games = await App.find();

    const usersWithTransactions = usersData.map((user) => {
      let availableGames = [...games];
      const transactions = [];
      const numTransactions = Math.floor(Math.random() * 5) + 1; // Random number of transactions per user (1-5)

      for (let i = 0; i < numTransactions; i++) {
        if (availableGames.length === 0) break; // Stop if no more games are available

        const randomGames = availableGames
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 5) + 1);
        transactions.push(createTransaction(randomGames));

        // Remove purchased games from the pool of available games
        availableGames = availableGames.filter(
          (game) => !randomGames.includes(game)
        );
      }

      user.transactions = transactions;
      user.library = transactions.flatMap((transaction) =>
        transaction.apps.map((app) => app.app)
      );
      return user;
    });

    const createdUsers = await User.collection.insertMany(
      usersWithTransactions
    );

    console.log("Seed data successfully added!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
