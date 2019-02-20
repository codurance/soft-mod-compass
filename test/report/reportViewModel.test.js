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

    expect(reportViewModel(loadContentStub, categories, questionChoices, answers)).toEqual({
      'scores': [55, 70, 30],
      'summaryRadial': {
        'scores': [55, 70, 30],
        'labels': ['cat 1', 'cat 2', 'cat 3']
      },
      'categories': [
        {
          'name': 'cat 1',
          'content': 'hello mediums',
          'score': 55,
          'subCategoryLabels': ['1 sub1', '1 sub2', '1 sub3', '1 sub4'],
          'subCategoryScores': [60, 20, 40, 100]
        },
        {
          'name': 'cat 2',
          'content': 'HELLO YOU DID WELL',
          'score': 70,
          'subCategoryLabels': ['2 sub1', '2 sub2', '2 sub3', '2 sub4'],
          'subCategoryScores': [40, 100, 40, 100]
        },
        {
          'name': 'cat 3',
          'content': 'hello this is still low, again',
          'score': 30,
          'subCategoryLabels': ['3 sub1', '3 sub2', '3 sub3', '3 sub4'],
          'subCategoryScores': [20, 40, 20, 40]
        }
      ]
    })
  })
})
