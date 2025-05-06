const handleSubmit = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
console.log({username,password})
  const ourPromise = await fetch("/.netlify/functions/loginAttempt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const ourData = await ourPromise.json();
  console.log({ ourData });
};
document.querySelector("#login-form").addEventListener("submit", handleSubmit);
