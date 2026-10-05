var toggle = document.getElementById('menuToggle');
var close = document.getElementById('menuClose');
var overlay = document.getElementById('menuOverlay');

function openMenu() {
  overlay.classList.add('is-open');
  toggle.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  overlay.setAttribute('aria-hidden', 'false');
}
function closeMenu() {
  overlay.classList.remove('is-open');
  toggle.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  overlay.setAttribute('aria-hidden', 'true');
}
toggle.addEventListener('click', function () {
  overlay.classList.contains('is-open') ? closeMenu() : openMenu();
});
close.addEventListener('click', closeMenu);