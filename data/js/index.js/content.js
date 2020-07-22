window.onload = function() {
    insertCopyright();
    
    insertDate();
    
    // Temp Hack - Remove when simplifying bar configuration
    const scores = [{{extractScores categories}}]
    updateAssessmentBars(scores);
    
    updateSummaryBars(scores);
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

function insertDate() {
    const dateSection = document.querySelector('#front-page_date');
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    dateSection.innerHTML = `${dd}/${mm}/${yyyy}`;
};


function updateSummaryBars(scores) {
  const graphContainers = Array.from(document.querySelectorAll('.summary-bar-graph__container'));
  
    for (let container of graphContainers) {
      
        const currentScore = scores[graphContainers.indexOf(container)];
        const innerFill = container.querySelector('.summary-bar-graph__inner-fill');
        const rule = container.querySelector('.summary-bar-graph__rule');
        
        innerFill.style.width = `${currentScore}%`;
        
        if (currentScore > 75) {
          innerFill.classList.add('good-result');
          rule.classList.add('good-result');
          container.querySelector('.summary-bar-graph__good-icon').classList.remove('hidden');
        } else if (currentScore >= 50) {
          innerFill.classList.add('average-result');
          rule.classList.add('average-result');
          container.querySelector('.summary-bar-graph__average-icon').classList.remove('hidden');
        } else {
          innerFill.classList.add('bad-result');
          rule.classList.add('bad-result');
          container.querySelector('.summary-bar-graph__bad-icon').classList.remove('hidden');
        }
    }
}



























