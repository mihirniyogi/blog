// Light/dark theme switch.
// The saved choice is applied early by layouts/_partials/head/theme-init.html;
// this file wires up the button. Keep STORAGE_KEY in sync with that file.

const STORAGE_KEY = "theme";
const root = document.documentElement;

function currentTheme() {
  return root.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  if (theme === "dark") {
    root.dataset.theme = "dark";
  } else {
    delete root.dataset.theme;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    // Storage can be unavailable (e.g. some private modes); the switch still works for this page.
  }
}

function updateButton(button) {
  const dark = currentTheme() === "dark";
  button.querySelector(".theme-toggle-text").textContent = dark ? "Light" : "Dark";
  button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
}

export function initThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;

  updateButton(button);
  button.hidden = false;

  button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
    updateButton(button);
  });
}
