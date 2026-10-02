/* js/router.js -- Elegant SPA router (hash-based, no server required) */
(function () {
  var ROUTES = ['home', 'program', 'materials', 'register'];
  var DEFAULT_ROUTE = 'home';
  var TRANSITION_MS = 320;
  var currentRoute = null;
  var isTransitioning = false;

  function getView(route) { return document.getElementById('view-' + route); }
  function parseHash() {
    var raw = (window.location.hash || '').replace('#', '').trim();
    var hash = raw.split('?')[0].split('&')[0];
    return ROUTES.indexOf(hash) !== -1 ? hash : DEFAULT_ROUTE;
  }
  function revealViewElements(viewEl) {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = viewEl.querySelectorAll('.reveal, .reveal-stagger');
    els.forEach(function (el) { el.classList.remove('is-visible'); });
    if (reduced) { els.forEach(function (el) { el.classList.add('is-visible'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });
    requestAnimationFrame(function () { els.forEach(function (el) { io.observe(el); }); });
  }
  function tryRunCounters(viewEl) {
    var counters = viewEl.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (reduced) { el.textContent = target; return; }
      el.textContent = '0'; var start = null; var dur = 1200;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCounter(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { io.observe(c); });
  }
  function updateNavLinks(route) {
    document.querySelectorAll('[data-route]').forEach(function (link) {
      var r = link.getAttribute('data-route');
      if (r === route) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
      else { link.classList.remove('active'); link.removeAttribute('aria-current'); }
    });
  }
  function navigate(route, pushState) {
    if (ROUTES.indexOf(route) === -1) route = DEFAULT_ROUTE;
    if (route === currentRoute || isTransitioning) return;
    isTransitioning = true;
    var prevRoute = currentRoute;
    var prevView = currentRoute ? getView(currentRoute) : null;
    var nextView = getView(route);
    if (!nextView) { isTransitioning = false; return; }

    // Cleanup timer or active state if leaving materials
    if (prevRoute === 'materials' && route !== 'materials' && window.cleanupMaterialsView) {
      window.cleanupMaterialsView();
    }

    if (pushState !== false) window.location.hash = '#' + route;
    updateNavLinks(route);
    if (prevView) { prevView.classList.add('view--leaving'); prevView.classList.remove('view--active'); }
    nextView.removeAttribute('hidden');
    nextView.classList.add('view--entering');
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        nextView.classList.add('view--active');
        nextView.classList.remove('view--entering');
      });
    });
    setTimeout(function () {
      if (prevView) { prevView.classList.remove('view--leaving'); prevView.setAttribute('hidden', ''); }
      currentRoute = route;
      isTransitioning = false;
      revealViewElements(nextView);
      tryRunCounters(nextView);

      // Initialize materials view when entered
      if (route === 'materials' && window.initMaterialsView) {
        window.initMaterialsView();
      }

      // Initialize program view when entered
      if (route === 'program' && window.initProgramInteractions) {
        window.initProgramInteractions();
      }
    }, TRANSITION_MS + 50);
  }
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-route]');
    if (!link) return;
    var route = link.getAttribute('data-route');
    if (!route) return;
    e.preventDefault();
    var burger = document.getElementById('burger-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    if (burger && burger.getAttribute('aria-expanded') === 'true') {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      if (mobileMenu) { mobileMenu.setAttribute('hidden', ''); }
      document.body.style.overflow = '';
    }
    if (link.hasAttribute('data-track')) {
      var tr = link.getAttribute('data-track');
      if (tr && window.setRegistrationTrack) {
        window.setRegistrationTrack(tr);
      }
      navigate(route, true);
      window.location.hash = '#' + route + '?track=' + tr;
      return;
    }
    navigate(route);
  });
  window.addEventListener('hashchange', function () {
    var route = parseHash();
    if (route !== currentRoute) navigate(route, false);
  });
  document.addEventListener('DOMContentLoaded', function () {
    var initialRoute = parseHash();
    currentRoute = initialRoute;
    if (initialRoute !== 'home') {
      var homeView = getView('home');
      if (homeView) { homeView.classList.remove('view--active'); homeView.setAttribute('hidden', ''); }
      var av = getView(initialRoute);
      if (av) { av.removeAttribute('hidden'); av.classList.add('view--active'); }
    }
    updateNavLinks(initialRoute);
    var activeView = getView(initialRoute);
    if (activeView) { revealViewElements(activeView); tryRunCounters(activeView); }
    if (initialRoute === 'materials' && window.initMaterialsView) {
      window.initMaterialsView();
    }
  });
})();