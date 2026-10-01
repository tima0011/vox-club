/* js/home.js - Home page logic: counter animation, footer year */
(function () {
  document.addEventListener('DOMContentLoaded', function () {

    /* Dynamic year in footer */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Animated counters - driven by router.js on view enter */
    /* (kept here for initial load; router.js re-runs on navigate) */
    var counters = document.querySelectorAll('#view-home .stat-number[data-count]');
    if (!counters.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
      var target   = parseInt(el.getAttribute('data-count'), 10);
      var duration = 1200;
      var start    = null;
      if (prefersReduced) { el.textContent = target; return; }
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCounter(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { io.observe(c); });
  });
})();