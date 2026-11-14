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

// Showcase photo hero: arrows and dots. Without this file the photos still scroll sideways.
(function () {
  var hero = document.querySelector(".photo-hero");
  if (!hero) return;
  var track = hero.querySelector(".photo-hero-track");
  var slides = track.querySelectorAll(".photo-hero-slide");
  var dots = hero.querySelectorAll(".photo-hero-dots a");
  var prev = hero.querySelector(".photo-hero-prev");
  var next = hero.querySelector(".photo-hero-next");
  var status = hero.querySelector(".photo-hero-status");
  var cur = 0;
  function index() { return Math.round(track.scrollLeft / track.clientWidth); }
  function go(i) {
    i = (i + slides.length) % slides.length;
    cur = i;
    track.scrollTo({ left: i * track.clientWidth });
    mark(i, true);
  }
  function mark(i, announce) {
    if (typeof i !== "number") i = cur = index();
    for (var d = 0; d < dots.length; d++) {
      if (d === i) dots[d].setAttribute("aria-current", "true");
      else dots[d].removeAttribute("aria-current");
    }
    if (announce && status) {
      var cap = slides[i].querySelector("figcaption");
      status.textContent = "Photo " + (i + 1) + " of " + slides.length + (cap ? ": " + cap.textContent : "");
    }
  }
  for (var d = 0; d < dots.length; d++) {
    (function (n) {
      dots[n].addEventListener("click", function (e) { e.preventDefault(); go(n); });
    })(d);
  }
  prev.addEventListener("click", function () { go(cur - 1); });
  next.addEventListener("click", function () { go(cur + 1); });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
  });
  var t;
  track.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(mark, 150); });
  track.addEventListener("scrollend", function () { mark(); });
  prev.hidden = false; next.hidden = false;
  mark();
})();

// Showcase project galleries: arrows and a count. Without this file the images still scroll sideways.
(function () {
  var galleries = document.querySelectorAll(".gallery");
  for (var g = 0; g < galleries.length; g++) {
    (function (gal) {
      var track = gal.querySelector(".gallery-track");
      var slides = track.querySelectorAll(".gallery-slide");
      var count = gal.querySelector(".gallery-count");
      var prev = gal.querySelector(".gallery-prev");
      var next = gal.querySelector(".gallery-next");
      var n = slides.length;
      function step() { return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth; }
      function index() { return Math.round(track.scrollLeft / step()); }
      var cur = 0;
      function show(i) { cur = i; count.textContent = (i + 1) + " / " + n; }
      function go(i) { i = (i + n) % n; track.scrollTo({ left: i * step() }); show(i); }
      prev.addEventListener("click", function () { go(cur - 1); });
      next.addEventListener("click", function () { go(cur + 1); });
      track.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
      });
      var t;
      track.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(function () { show(index()); }, 150); });
      track.addEventListener("scrollend", function () { show(index()); });
      prev.hidden = false; next.hidden = false; show(0);
    })(galleries[g]);
  }
})();
