(function insertCopyright(data) {
  const PAGES = document.querySelectorAll('[id$="-page"]');
  const COPYRIGHT_HTML = `<div class="copyright">&copy; Codurance ${new Date().getFullYear()}</div>`;

  for (let page of PAGES) {
    page.innerHTML += COPYRIGHT_HTML;
  }
})();


(function insertDate() {
    const dateSection = document.querySelector('#front-page_date');
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    dateSection.innerHTML = `${dd}/${mm}/${yyyy}`;
})();




const updateAssessmentBars = scores => {
  const graphs = Array.from(document.querySelectorAll('.assessment-page__inner-fill'));

  for (let graph of graphs) {
    const currentScore = scores[graphs.indexOf(graph)];
    const category = graph.dataset.category;
    const warningBox = document.querySelector(`.assessment-page__warning-box[data-category="${category}"]`);
    
    graph.style.width = `${currentScore}%`;
    
    if (currentScore > 66) {
        graph.classList.add('good-result');
    } else if (currentScore > 33) {
        graph.classList.add('average-result');
    } else {
        graph.classList.add('bad-result');
        warningBox.classList.remove('hidden');
    }
  }
}

(function updateAssessmentGraphs(scores) {
  updateAssessmentBars(scores);
})([{{summaryRadial.scores}}]);





(function updateBreakdownGraphs() {
  const GRAPHS = [
                  document.querySelectorAll('#om-results-page .graph-bar_result-bar'),
                  document.querySelectorAll('#cd-results-page .graph-bar_result-bar'),
                  document.querySelectorAll('#c-results-page .graph-bar_result-bar'),
                  document.querySelectorAll('#cft-results-page .graph-bar_result-bar'),
                  document.querySelectorAll('#xpp-results-page .graph-bar_result-bar')
                 ];

  let data = [];

  {{#each categories}}
    data.push([{{this.subCategoryScores}}]);
  {{/each}}

 for (let i = 0; i < GRAPHS.length; i++) {

      for (let j = 0; j < GRAPHS[i].length; j++) {
          GRAPHS[i][j].style.width = `${data[i][j]}%`;
      }

  }
})();
