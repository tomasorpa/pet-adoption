let serverSignature;
let serverTimestamp;
let cloudinaryObject;
let isFormReady = false;
async function getSignature() {
  const res = await fetch("/.netlify/functions/getSignature");
  const data = await res.json();
  serverSignature = data.signature;
  serverTimestamp = data.timestamp;
}
getSignature();
const fileInput = document.querySelector("#file-field");
fileInput.addEventListener("change", async () => {
  isFormReady = true;
  document.querySelector("#submit-btn").style.opacity = ".1";
  const data = new FormData();
  data.append("file", fileInput.files[0]);
  data.append("api_key", "369179715574996");
  data.append("signature", serverSignature);
  data.append("timestamp", serverTimestamp);

  const cloudinaryResponse = await axios.post(
    "https://api.cloudinary.com/v1_1/de6w3xtrg/auto/upload",
    data,
    {
      Headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        console.log(e.loaded / e.total);
      },
    }
  );
  cloudinaryObject = cloudinaryResponse.data;
  const photoPreview = document.querySelector("#photo-preview");
  photoPreview.innerHTML = `<img src="https://res.cloudinary.com/de6w3xtrg/image/upload/w_190,h_190,c_fill/${cloudinaryResponse.data.public_id}.png"/>`;
  isFormReady = false;
  document.querySelector("#submit-btn").style.opacity = "1";
});
