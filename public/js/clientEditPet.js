const url = new URLSearchParams(window.location.search);
const id = url.get("id");

const getEditPet = async () => {
  const data = await fetch("/.netlify/functions/getSingularPet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const pet = await data.json();

  if (!pet.name) {
    window.location = "admin";
  }
  document.querySelector("#name").value = pet.name;
  document.querySelector("#birthYear").value = pet.birthYear;
  document.querySelector("#species").value = pet.species;
  document.querySelector("#description").value = pet.description;
  document.querySelector("#edit-pet-form").classList.remove("form-is-loading");
  document.querySelector("#name").focus();
};
getEditPet();

const editPetForm = document.querySelector("#edit-pet-form");

editPetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isFormReady) {
    return null;
  }

  isFormReady = true;
  editPetForm.disabled = true;
  document.querySelector("#edit-pet-form").classList.add("form-is-loading");
  const pet = {
    id,
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

  if (pet.photo) {
    const photoPreview = document.querySelector("#photo-preview");
    photoPreview.innerHTML = `<img src="https://res.cloudinary.com/de6w3xtrg/image/upload/w_190,h_190,c_fill/${pet.photo}.png"/>`;
  }
  console.log(pet);
  const data = await fetch("/.netlify/functions/saveChanges", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
  const res = await data.json();
  if (res.success) {
    window.location = "/admin";
  }
});
