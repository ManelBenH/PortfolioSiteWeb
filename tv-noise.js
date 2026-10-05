/* Ajoute le calque de grain (voir tv-noise.css) et le fait apparaître une fois la page chargée */
(function () {
  const wrapper = document.createElement('div');
  wrapper.className = 'tv-noise-wrapper';
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.innerHTML = '<div class="tv-noise"></div>';
  document.body.prepend(wrapper);

  window.addEventListener('load', function () {
    wrapper.classList.add('is-visible');
  });
})();
