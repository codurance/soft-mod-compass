const reportViewModel = require('../../src/server/report/reportViewModel')
const loadContentStub = category => {
  if (category === 'cat 1') {
    return {
      page1: 'hello mediums',
      page2: null
    }
  }
  if (category === 'cat 2') {
    return {
      page1: 'HELLO YOU DID WELL',
      page2: 'Yet another page'
    }
  }
  if (category === 'cat 3') {
    return {
      page1: 'hello this is still low, again',
      page2: 'Another low page'
    }
  }
}
const loadStaticContentStub = category => {
  if (category === 'cat 1') {
    return {
      content: 'static content 1\nstatic content 1 line 2',
      contentWithNoLineBreaks: 'static content 1 static content 1 line 2'
    }
  }
  if (category === 'cat 2') {
    return {
      content: 'static content 2\nstatic content 2 line 2',
      contentWithNoLineBreaks: 'static content 2 static content 2 line 2'
    }
  }
  if (category === 'cat 3') {
    return {
      content: 'static content 3\nstatic content 3 line 2',
      contentWithNoLineBreaks: 'static content 3 static content 3 line 2'
    }
  }
}

describe('survey results', () => {
  test('creates survey results', () => {
    const categories = [
      {
        name: 'cat 1',
        subCategoryNames: ['1 sub1', '1 sub2', '1 sub3', '1 sub4']
      },
      {
        name: 'cat 2',
        subCategoryNames: ['2 sub1', '2 sub2', '2 sub3', '2 sub4']
      },
      {
        name: 'cat 3',
        subCategoryNames: ['3 sub1', '3 sub2', '3 sub3', '3 sub4']
      }
    ]
    const questionChoices = [
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one'],
      ['five', 'four', 'three', 'two', 'one']
    ]
    const answers = ['three', 'one', 'two', 'five', 'two', 'five', 'two', 'five', 'one', 'two', 'one', 'two']

    const result = reportViewModel(loadContentStub, categories, questionChoices, answers, loadStaticContentStub)

    expect(result).toEqual({
      'scores': [55, 70, 30],
      'summaryRadial': {
        'scores': [55, 70, 30],
        'labels': ['cat 1', 'cat 2', 'cat 3']
      },
      'categories': [
        {
          'name': 'cat 1',
          'content': {
            'page1': 'hello mediums',
            'page1PageNumber': 1,
            'page2': null,
            'page2PageNumber': null
          },
          'staticContent':
          {
            'content': 'static content 1\nstatic content 1 line 2',
            'contentWithNoLineBreaks': 'static content 1 static content 1 line 2'
          },
          'score': 55,
          'subCategoryLabels': ['1 sub1', '1 sub2', '1 sub3', '1 sub4'],
          'subCategoryLabel1': '1 sub1',
          'subCategoryLabel2': '1 sub2',
          'subCategoryLabel3': '1 sub3',
          'subCategoryLabel4': '1 sub4',
          'subCategoryScores': [60, 20, 40, 100]
        },
        {
          'name': 'cat 2',
          'content': {
            'page1': 'HELLO YOU DID WELL',
            'page1PageNumber': 2,
            'page2': 'Yet another page',
            'page2PageNumber': 3
          },
          'staticContent':
          {
            'content': 'static content 2\nstatic content 2 line 2',
            'contentWithNoLineBreaks': 'static content 2 static content 2 line 2'
          },
          'score': 70,
          'subCategoryLabels': ['2 sub1', '2 sub2', '2 sub3', '2 sub4'],
          'subCategoryLabel1': '2 sub1',
          'subCategoryLabel2': '2 sub2',
          'subCategoryLabel3': '2 sub3',
          'subCategoryLabel4': '2 sub4',
          'subCategoryScores': [40, 100, 40, 100]
        },
        {
          'name': 'cat 3',
          'content': {
            'page1': 'hello this is still low, again',
            'page1PageNumber': 4,
            'page2': 'Another low page',
            'page2PageNumber': 5
          },
          'staticContent':
          {
            'content': 'static content 3\nstatic content 3 line 2',
            'contentWithNoLineBreaks': 'static content 3 static content 3 line 2'
          },
          'score': 30,
          'subCategoryLabels': ['3 sub1', '3 sub2', '3 sub3', '3 sub4'],
          'subCategoryLabel1': '3 sub1',
          'subCategoryLabel2': '3 sub2',
          'subCategoryLabel3': '3 sub3',
          'subCategoryLabel4': '3 sub4',
          'subCategoryScores': [20, 40, 20, 40]
        }
      ]
    })
  })
})
