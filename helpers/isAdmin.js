const cookie = require("cookie");
const isAdmin = (event) => {
  const incomingCookie = cookie.parse(event.headers.cookie || "");
  if (
    incomingCookie?.petadoption ==
    "sisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamanisisamani"
  ) {
    return true
    }
    return false
};
module.exports=isAdmin