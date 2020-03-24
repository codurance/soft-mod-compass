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
  const GRAPHS = [...document.querySelectorAll('.assessment-page_graph .graph-bar_result-bar')];

  for (let graph of GRAPHS) {
    graph.style.width = `${scores[GRAPHS.indexOf(graph)]}%`;
  }
}

const updateAssessmentText = scores => {
  const TEXTS = [...document.querySelectorAll('.assessment-page_result-text')];
    
  for (let text of TEXTS) {
      let alignmentText = scores[TEXTS.indexOf(text)] < 33.3
                          ? 'Somewhat Aligned'
                          : scores[TEXTS.indexOf(text)] < 66.6
                          ? 'Almost Aligned'
                          : 'Closely Aligned';
                          
    text.innerHTML = alignmentText;
  }
}

(function updateAssessmentGraphs(scores) {
  updateAssessmentBars(scores);
  updateAssessmentText(scores);
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
