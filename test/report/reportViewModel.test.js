const reportViewModel = require('../../src/server/report/reportViewModel')
const loadContentStub = category => {
  if (category === 'cat 1') {
    return 'hello mediums'
  }
  if (category === 'cat 2') {
    return 'HELLO YOU DID WELL'
  }
  if (category === 'cat 3') {
    return 'hello this is still low, again'
  }
}
const loadStaticContentStub = category => {
  if (category === 'cat 1') {
    return 'static content 1'
  }
  if (category === 'cat 2') {
    return 'static content 2'
  }
  if (category === 'cat 3') {
    return 'static content 3'
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
          'content': 'hello mediums',
          'staticContent': 'static content 1',
          'score': 55,
          'subCategoryLabels': ['1 sub1', '1 sub2', '1 sub3', '1 sub4'],
          'subCategoryScores': [60, 20, 40, 100]
        },
        {
          'name': 'cat 2',
          'content': 'HELLO YOU DID WELL',
          'staticContent': 'static content 2',
          'score': 70,
          'subCategoryLabels': ['2 sub1', '2 sub2', '2 sub3', '2 sub4'],
          'subCategoryScores': [40, 100, 40, 100]
        },
        {
          'name': 'cat 3',
          'content': 'hello this is still low, again',
          'staticContent': 'static content 3',
          'score': 30,
          'subCategoryLabels': ['3 sub1', '3 sub2', '3 sub3', '3 sub4'],
          'subCategoryScores': [20, 40, 20, 40]
        }
      ]
    })
  })
})
