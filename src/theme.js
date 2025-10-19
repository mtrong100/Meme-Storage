// theme.js - Apply theme immediately before Vue app loads
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "system";
  const html = document.documentElement;

  if (savedTheme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  } else if (savedTheme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

// Call this before your Vue app initializes
initializeTheme();
