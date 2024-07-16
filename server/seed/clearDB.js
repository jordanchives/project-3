const models = require("../models/index.js");
const db = require("../config/connection.js");

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db
      .listCollections({ name: collectionName })
      .toArray();

    if (modelExists.length > 0) {
      await models[modelName].db.dropCollection(collectionName);
    }
  } catch (error) {
    console.error(error);
  }
};
