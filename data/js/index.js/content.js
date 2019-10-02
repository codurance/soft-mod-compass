(function insertCopyright(data) {
  const PAGES = document.querySelectorAll('[id$="-page"]');
  const COPYRIGHT_HTML = `<div class="copyright">&copy; Codurance ${new Date().getFullYear()}</div>`;

  for (let page of PAGES) {
    page.innerHTML += COPYRIGHT_HTML;
  }
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
                          ? 'Almsot Aligned'
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





(function insertBreakdownPages(scores) {
  const BREAKDOWN_PAGES = [...document.querySelectorAll('[id$="-breakdown-page"]')];

  for (let breakdownPage of BREAKDOWN_PAGES) {
    let result = scores[BREAKDOWN_PAGES.indexOf(breakdownPage)] < 33
                 ? 'bad'
                 : scores[BREAKDOWN_PAGES.indexOf(breakdownPage)] < 66
                 ? 'avg'
                 : 'good';
                 
    breakdownPage.style.background       = `url(assets/pageImgs/${breakdownPage.id}-${result}.jpg)`;
    breakdownPage.style.backgroundRepeat = 'no-repeat';
    breakdownPage.style.backgroundSize   = 'cover';
  }
})([{{summaryRadial.scores}}]);