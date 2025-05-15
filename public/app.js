const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();
const temperatureSpan = document.querySelector("#temperature-output");
const apiUrl = "https://api.weather.gov/gridpoints/MFL/110,50/forecast";

const getTemperature = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  temperatureSpan.textContent = data.properties.periods[0].temperature;
};
getTemperature();
const petCardsContainer = document.querySelector(".pet-cards--container");
const petsData = async () => {
  const res = await fetch(
    "https://tomasorpa-petadoption.netlify.app/.netlify/functions/pets"
  );
  const data = await res.json();
  console.log(data);
  data.forEach((pet) => {
    const petPhoto = !pet.photo ? "./images/fallback-img.jpg" : pet.photo;
    const clone = template.content.cloneNode(true);

    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-card").dataset.species = pet.species;
    clone.querySelector("p").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = getPetAge(pet.birthYear);
    clone.querySelector("img").src = petPhoto;
    wrapper.appendChild(clone);
  });
  document.querySelector(".pet-cards--container").appendChild(wrapper);
};
petsData();
const getPetAge = (birthYear) => {
  const currentDate = new Date().getFullYear();
  const age = currentDate - birthYear + " Years Old";
  return age;
};

const handleFilterButtons = (e) => {
  filterBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  e.target.classList.add("active");
  const currentFilter = e.target.dataset.filter;
  console.log(currentFilter);
  document.querySelectorAll(".pet-card").forEach((card) => {
    if (currentFilter === card.dataset.species || currentFilter === "all") {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
};
const filterBtns = document.querySelectorAll(".pet-filter button");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", handleFilterButtons);
});
