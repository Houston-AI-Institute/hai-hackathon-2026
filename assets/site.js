// Phone menu toggle. The page works without this file: the nav simply stays open.
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var btn = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
  });
})();

// Light/dark switch. With no saved choice the site follows the device setting.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  var label = btn.querySelector(".theme-label");
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return media && media.matches ? "dark" : "light";
  }
  function update() {
    var next = current() === "dark" ? "light" : "dark";
    btn.setAttribute("data-next", next);
    label.textContent = next === "dark" ? "Dark mode" : "Light mode";
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
  }
  btn.addEventListener("click", function () {
    var next = btn.getAttribute("data-next");
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("hai-theme", next); } catch (e) {}
    update();
  });
  if (media && media.addEventListener) media.addEventListener("change", update);
  update();
  btn.hidden = false;
})();
