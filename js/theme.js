/* js/theme.js — Dark-only mode (light theme removed) */
(function () {
  const STORAGE_KEY = 'vox-theme';
  const html = document.documentElement;

  // Always force dark theme, clear any saved light preference
  html.setAttribute('data-theme', 'dark');
  localStorage.removeItem(STORAGE_KEY);
})();

