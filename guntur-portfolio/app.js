const languageToggle = document.querySelector("#language-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const photoUpload = document.querySelector("#photo-upload");
const photoPreview = document.querySelector("#photo-preview");

let language = "en";

function updateLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-en][data-id]").forEach((element) => {
    element.textContent = element.dataset[language];
  });
  document.querySelector(".language-active").textContent = language.toUpperCase();
  languageToggle.setAttribute(
    "aria-label",
    language === "en" ? "Switch to Indonesian" : "Switch to English",
  );
}

languageToggle.addEventListener("click", () => {
  language = language === "en" ? "id" : "en";
  updateLanguage();
});

themeToggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.textContent = dark ? "☀" : "◐";
});

photoUpload.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;
  const imageUrl = URL.createObjectURL(file);
  photoPreview.innerHTML = `<img class="photo-preview-image" src="${imageUrl}" alt="Uploaded profile photo" />`;
});

updateLanguage();
