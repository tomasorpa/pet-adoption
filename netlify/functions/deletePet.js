const isAdmin = require("../../helpers/isAdmin");
const { getDbClient } = require("../../helpers/getDbClient");
const { ObjectId } = require("mongodb");
const escapeHTML = require("escape-html");

const handler = async (event) => {
  try {
    if (isAdmin(event)) {
      const { id } = JSON.parse(event.body);
      if (!ObjectId.isValid(id)) {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({}),
        };
      }
      const client = await getDbClient();
      await client.connect();

      await client
        .db("petAdoptionCenter")
        .collection("pets")
        .deleteOne({ _id: new ObjectId(id) });
      client.close();
      pet.name = escapeHTML(pet.name);
      pet.birthYear = escapeHTML(pet.birthYear);
      pet.species = escapeHTML(pet.species);
      pet.description = escapeHTML(pet.description);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ success: true }),
      };
    }
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false }),
    };
  } catch (error) {
    console.error(" Error in getSingularPet:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};

module.exports = { handler };
