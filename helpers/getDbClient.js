const { MongoClient } = require("mongodb");
const getDbClient = async () => {
  const client = new MongoClient(process.env.DB_CNN);
  await client.connect;
  return client;
};
module.exports = { getDbClient };
