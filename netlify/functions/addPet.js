const sanitize = require("sanitize-html");
const { getDbClient } = require("../../helpers/getDbClient");
const isAdmin = require("../../helpers/isAdmin");

const cleanUp = (x) => {
  return sanitize(x, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (typeof body.name !== "string") {
    body.name = "";
  }

  if (typeof body.description !== "string") {
    body.description = "";
  }

  let pet = {
    name: cleanUp(body.name),
    description: cleanUp(body.description),
    species: cleanUp(body.species.toLowerCase()),
    birthYear: new Date().getFullYear(),
  };

  if (body.birthYear > new Date().getFullYear() || body.birthYear < 2000) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Invalid birth year" }),
    };
  }

  if (pet.species !== "cat" && pet.species !== "dog") {
    pet.species = "dog";
  }

  if (isAdmin(event)) {
    pet.birthYear = body.birthYear;
    const client = await getDbClient();
    await client.db().collection("pets").insertOne(pet);

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
    statusCode: 403,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      success: false,
      message: "Forbidden: You are not authorized",
    }),
  };
};

module.exports = { handler };
