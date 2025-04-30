const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
      const client = new MongoClient(process.env.DB_CNN);
      return client
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
module.exports = { dbConnection };
