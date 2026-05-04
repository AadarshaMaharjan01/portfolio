document.documentElement.classList.add("js");

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const header = document.querySelector(".site-header");
const aboutStage = document.querySelector(".about-stage");

const updateHeaderHeight = () => {
  if (header) {
    document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
  }
};

const revealBetween = (start, end) => {
  if (end === start) {
    return 1;
  }

  return clamp((window.scrollY - start) / (end - start), 0, 1);
};

const updateHeroReveal = () => {
  const root = document.documentElement;

  root.style.setProperty("--hero-reveal-one", revealBetween(28, 190).toFixed(3));
  root.style.setProperty("--hero-reveal-two", revealBetween(120, 300).toFixed(3));
  root.style.setProperty("--hero-reveal-three", revealBetween(190, 390).toFixed(3));
};

const revealWithinStage = (stage, start, end) => {
  if (!stage) {
    return 0;
  }

  const headerHeight = header ? header.offsetHeight : 0;
  const stageStart = stage.offsetTop - headerHeight;
  const progress = window.scrollY - stageStart;

  return clamp((progress - start) / (end - start), 0, 1);
};

const updateAboutReveal = () => {
  const root = document.documentElement;

  root.style.setProperty("--about-reveal-one", revealWithinStage(aboutStage, -220, -20).toFixed(3));
  root.style.setProperty("--about-reveal-two", revealWithinStage(aboutStage, -85, 80).toFixed(3));
};

updateHeaderHeight();
window.addEventListener("resize", () => {
  updateHeaderHeight();
  updateHeroReveal();
  updateAboutReveal();
});

updateHeroReveal();
updateAboutReveal();
window.addEventListener(
  "scroll",
  () => {
    updateHeroReveal();
    updateAboutReveal();
  },
  { passive: true },
);
