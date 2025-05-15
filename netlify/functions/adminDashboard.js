const cookie = require("cookie");
const isAdmin = require("../../helpers/isAdmin");
const { getDbClient } = require("../../helpers/getDbClient");
const escapeHTML = require("escape-html");
const generateHtml = (pets) => {
  let petHtml = `<div class="pet-cards--container mt">`;
  petHtml += pets
    .map(
      (pet) => `
  <div class="pet-card">
            <div class="card-text">
              <h3>${escapeHTML(pet.name)} </h3>
              <p>${escapeHTML(pet.description)} </p>
              <div class="action-btns">
  <a href="/admin/edit-pet?id=${pet._id}" class="action-btn">Edit</a>
  <button onClick="handleDelete('${pet._id}',this)" class="action-btn">Delete</button>
</div>
            </div>
            <img src="/images/fallback-img.jpg" alt="A ${escapeHTML(pet.species)} named ${escapeHTML(pet.name)} " />
          </div>
    `
    )
    .join("");
  petHtml += `</div>`;
  return petHtml;
};
const handler = async (event) => {
  const incomingCookie = cookie.parse(event.headers.cookie || "");

  const client = await getDbClient();

  const pets = await client
    .db("petAdoptionCenter")
    .collection("pets")
    .find()
    .toArray();

  await client.connect();
  const petHtml = generateHtml(pets);
  if (isAdmin(event)) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true, pets: petHtml }),
    };
  }

  console.log({ incomingCookie });
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
