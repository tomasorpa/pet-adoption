const { MongoClient } = require("mongodb");
const { getDbClient } = require("../../helpers/getDbClient");

const handler = async () => {
  let client; // ⬅️ Declarado fuera del try

  try {
    client = await getDbClient();

    const pets = await client
      .db("petAdoptionCenter")
      .collection("pets")
      .find()
      .toArray();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(pets),
    };
  } catch (error) {
    console.error("Database error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  } finally {
    if (client) {
      await client.close();}
  }
};

module.exports = { handler };
