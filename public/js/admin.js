const start = async () => {
  const ourPromise = await fetch("/.netlify/functions/adminDashboard");
  const ourData = await ourPromise.json();
  if (ourData.success) {
    console.log({ ourData });
    document.querySelector("#container-rendered--pets").innerHTML =
      ourData.pets;
    //show pet management ui
  } else {
    window.location = "/login";
  }
};

start();
 async function handleDelete(id, el) {
   el.closest(".pet-card").remove();
   

   await fetch("/.netlify/functions/deletePet", {
     method: "DELETE",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({id}),
   });
};
