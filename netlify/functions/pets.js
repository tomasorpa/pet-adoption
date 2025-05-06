const { MongoClient } = require("mongodb");

const handler = async () => {
  const client = new MongoClient(process.env.DB_CNN);

  try {
    await client.connect();

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
    await client.close();
  }
};

module.exports = { handler };
