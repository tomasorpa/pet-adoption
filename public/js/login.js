const handleSubmit = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const ourPromise = await fetch("/.netlify/functions/loginAttempt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),

    // body: JSON.stringify({
    //   username,
    //   password,
    // }),
  });

  const { success } = await ourPromise.json();
  if (success) {
    window.location = "/admin";
  }
  console.warn("try again");
};
document.querySelector("#login-form").addEventListener("submit", handleSubmit);
