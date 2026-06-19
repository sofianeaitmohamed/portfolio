(() => {
  const storageKey = "portfolio-theme";
  const body = document.body;
  const toggle = document.getElementById("themeToggle");

  if (!body || !toggle) {
    return;
  }

  const applyTheme = (mode) => {
    const isDark = mode === "dark";
    body.classList.toggle("theme-dark", isDark);
    toggle.textContent = isDark ? "\u2600" : "\uD83C\uDF19";
    toggle.setAttribute(
      "aria-label",
      isDark ? "Activer le theme clair" : "Activer le theme sombre"
    );
  };

  let savedTheme = "light";
  try {
    const value = window.localStorage.getItem(storageKey);
    if (value === "dark" || value === "light") {
      savedTheme = value;
    }
  } catch (_) {
    savedTheme = "light";
  }

  applyTheme(savedTheme);

  toggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("theme-dark") ? "light" : "dark";
    body.classList.add("theme-animating");
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch (_) {
      // Ignore storage errors and keep toggling for current session.
    }
    window.setTimeout(() => {
      body.classList.remove("theme-animating");
    }, 420);
  });
})();
