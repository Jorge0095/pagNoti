document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-include]").forEach(function (el) {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(res => res.text())
      .then(data => el.innerHTML = data)
      .catch(err => el.innerHTML = "<p>Error al cargar " + file + "</p>");
  });
});
