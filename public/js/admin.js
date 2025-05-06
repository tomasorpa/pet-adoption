const start = async () => {
  const ourPromise = await fetch("/.netlify/functions/adminDashboard");
  const ourData = await ourPromise.json();
  console.log({ ourData });
  if (ourData.success) {
    //show pet management ui
  } else {
    window.location = "/login";
  }
};

start();
