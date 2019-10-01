(function insertCopyright() {
  const PAGES = document.querySelectorAll('[id$="-page"]');
  const COPYRIGHT_HTML = `<div class="copyright">&copy; Codurance ${new Date().getFullYear()}</div>`;

  for (let page of PAGES) {
    page.innerHTML += COPYRIGHT_HTML;
  }
})();