const handler = async () => {
  return {
    statusCode: 200,
    body: "tomas".toUpperCase(),
  };
};

module.exports = { handler };
