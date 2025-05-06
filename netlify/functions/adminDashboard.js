const cookie = require("cookie");

const handler = async (event) => {
  const incomingCookie = cookie.parse(event.headers.cookie||"");
  if (
    incomingCookie?.petadoption ==
    "sisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamani"
  ) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true }),
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
