const addPetBtn = document.querySelector("#Add-new-pet");

addPetBtn.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isFormReady) {
    return null;
  }

  isFormReady=true
  addPetBtn.disabled = true;
  const pet = {
    name: document.querySelector("#name").value,
    birthYear: document.querySelector("#birthYear").value,
    species: document.querySelector("#species").value,
    description: document.querySelector("#description").value,
  };
  if (cloudinaryObject) {
    pet.public_id = cloudinaryObject.public_id;
    pet.version = cloudinaryObject.version;
    pet.signature = cloudinaryObject.signature;
    console.log(pet);
  }
  console.log(pet);
  document.querySelector("#Add-new-pet").classList.add("form-is-loading");
  const data = await fetch("/.netlify/functions/addPet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
  const res = await data.json();
  if (res.success) {
    window.location = "/admin";
  }
});
