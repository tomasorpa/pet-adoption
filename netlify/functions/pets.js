require("dotenv").config();
const { MongoClient } = require("mongodb");
const handler = async () => {
  const client = new MongoClient(process.env.DB_CNN);
  await client.connect();
  const pets = await client
    .db("petAdoptionCenter")
    .collection("pets")
    .find()
    .toArray();
  client.close();
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-origin": "*",
    },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
