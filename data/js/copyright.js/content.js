window.onload = function() {
    insertCopyright();
}

function insertCopyright() {
  let pageId = "-page";
  if(document.documentElement.lang === "es") {
    pageId += "-es";
  } else {
    pageId += "-en";
  }
  const PAGES = document.querySelectorAll(`[id$="${pageId}"]`);
  const COPYRIGHT_HTML = `<div class="copyright">&copy; Codurance ${new Date().getFullYear()}</div>`;

  for (let page of PAGES) {
    page.innerHTML += COPYRIGHT_HTML;
  }
};