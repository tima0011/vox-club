/* js/nav.js - Navigation: scroll behavior, mobile menu */
/* NOTE: Active nav link management is handled by router.js */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var header    = document.getElementById('site-header');
    var burger    = document.getElementById('burger-btn');
    var mobileMenu = document.getElementById('mobile-menu');

    /* Scroll: add .scrolled class to header */
    var SCROLL_THRESHOLD = 40;
    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile menu toggle */
    if (burger && mobileMenu) {
      burger.addEventListener('click', function () {
        var isOpen = burger.getAttribute('aria-expanded') === 'true';
        var nextState = !isOpen;
        burger.setAttribute('aria-expanded', String(nextState));
        if (nextState) {
          mobileMenu.removeAttribute('hidden');
          document.body.style.overflow = 'hidden';
        } else {
          mobileMenu.setAttribute('hidden', '');
          document.body.style.overflow = '';
        }
      });

      /* Close on Escape */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
          burger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('hidden', '');
          document.body.style.overflow = '';
          burger.focus();
        }
      });
    }
  });
})();