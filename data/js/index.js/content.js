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


























