(function () {
  var btn = document.getElementById('mobile-menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    var isOpen = menu.classList.contains('block');
    menu.classList.toggle('hidden', isOpen);
    menu.classList.toggle('block', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
})();
