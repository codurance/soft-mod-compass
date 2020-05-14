window.onload = function() {
    insertCopyright();
    
    insertDate();
    
    updateAssessmentBars([{{summaryRadial.scores}}]);
    
    updateCategoryGraphs();
    
    updateSummaryBars([{{summaryRadial.scores}}]);
}

function insertCopyright() {
  let pageId = "-page";
  if(document.documentElement.lang === "es") {
    pageId += "-es";
  }
  const PAGES = document.querySelectorAll('[id$="-page-es"]');
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

function updateAssessmentBars(scores) {
  const graphs = Array.from(document.querySelectorAll('.assessment-page__inner-fill'));

  for (let graph of graphs) {
    const currentScore = scores[graphs.indexOf(graph)];
    const category = graph.dataset.category;
    const warningBox = document.querySelector(`.assessment-page__warning-box[data-category="${category}"]`);
    
    graph.style.width = `${currentScore}%`;
    
    if (currentScore > 75) {
        graph.classList.add('good-result');
    } else if (currentScore >= 50) {
        graph.classList.add('average-result');
    } else {
        graph.classList.add('bad-result');
        warningBox.classList.remove('hidden');
    }
  }
}

function updateCategoryGraphs(subCategoryScores) {
    const pages = Array.from(document.querySelectorAll('.js-category-page'));
    let data = [];

  {{#each categories}}
    data.push([{{this.subCategoryScores}}]);
  {{/each}}
  
    
    for (let page of pages) {
        const graphs = Array.from(page.querySelectorAll('.main-bar-graph__container'));
        // const pageIndex = pages.indexOf(page);
        const dataSet = data[pages.indexOf(page)];

        updateGraphsOnPage(dataSet, graphs);
    }
    
    function updateGraphsOnPage(dataSet, arrayOfGraphs) {
        for (let graph of arrayOfGraphs) {
            const score = dataSet[arrayOfGraphs.indexOf(graph)];
            
            const innerFill = graph.querySelector('.main-bar-graph__inner-fill');
            const rule = graph.querySelector('.main-bar-graph__rule');
            
            innerFill.style.width = `${score}%`;
            
                if (score === 100) {
                    innerFill.classList.add('good-result');
                    rule.classList.add('good-result');
                    graph.querySelector('.main-bar-graph__good-icon').classList.remove('hidden');
                }else if (score === 80) {
                    innerFill.classList.add('good-result');
                    rule.classList.add('good-result');
                    graph.querySelector('.main-bar-graph__average-high-icon').classList.remove('hidden');
                } else if (score === 60) {
                    innerFill.classList.add('average-result');
                    rule.classList.add('average-result');
                    graph.querySelector('.main-bar-graph__average-icon').classList.remove('hidden');
                } else {
                    innerFill.classList.add('bad-result');
                    rule.classList.add('bad-result');
                    graph.querySelector('.main-bar-graph__bad-icon').classList.remove('hidden');
                }
        }
    }
    
}

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



























