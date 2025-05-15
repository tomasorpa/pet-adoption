const cookie = require("cookie");

const handler = async (event) => {
  const { username, password } = JSON.parse(event.body);
  if (username == "SI" && password == "NO") {
    const myCookie = cookie.serialize(
      "petadoption",
      "sisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamani",
      {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      }
    );
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": myCookie,
        Location: "/",
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
};

module.exports = { handler };
