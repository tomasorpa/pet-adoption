document.querySelector("#logout-btn").addEventListener("click", async () => {
  await fetch("/.netlify/functions/logout");
  window.location = "/";
});
