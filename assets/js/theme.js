// Loaded blocking in <head> so the theme is set before first paint (no flash).
// Order: saved choice, then the OS preference, then dark.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}

  function apply(theme) {
    root.dataset.theme = theme;
    var button = document.querySelector('.theme-toggle');
    if (button) {
      // Labels come from the page so each language version announces its own text.
      button.setAttribute('aria-label', theme === 'dark'
        ? (button.dataset.labelLight || 'Switch to light theme')
        : (button.dataset.labelDark || 'Switch to dark theme'));
    }
  }

  apply(saved === 'light' || saved === 'dark'
    ? saved
    : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.dataset.theme);
    document.querySelector('.theme-toggle').addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });
})();
