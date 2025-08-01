document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
      const html = await response.text();
      el.innerHTML = html;
    } catch (err) {
      console.error(`Error al incluir ${file}:`, err);
    }
  });
});
