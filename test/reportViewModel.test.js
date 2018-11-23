const reportViewModel = require('../src/server/reportViewModel')

describe('survey results', () => {
  it('creates survey results', () => {
    const categories = [
      {
        name: 'cat 1',
        low: 'hello lowww',
        medium: 'hello mediums',
        high: 'hello you did well',
        subCategoryNames: ['1 sub1', '1 sub2', '1 sub3', '1 sub4']
      },
      {
        name: 'cat 2',
        low: 'hello this is still low',
        medium: 'hello mediums is ok',
        high: 'HELLO YOU DID WELL',
        subCategoryNames: ['2 sub1', '2 sub2', '2 sub3', '2 sub4']
      }
    ]
    const questionChoices = [
      ['one', 'two', 'three', 'four', 'five'],
      ['one', 'two', 'three', 'four', 'five'],
      ['one', 'two', 'three', 'four', 'five'],
      ['one', 'two', 'three', 'four', 'five'],
      ['one', 'two', 'three', 'four', 'five'],
      ['one', 'two', 'three', 'four', 'five'],
      ['one', 'two', 'three', 'four', 'five'],
      ['one', 'two', 'three', 'four', 'five']
    ]
    const answers = ['three', 'one', 'two', 'five', 'two', 'five', 'two', 'five']

    expect(reportViewModel(categories, questionChoices, answers)).toEqual({
      'scores': [55, 70],
      'summaryRadial': {
        'scores': [55, 70],
        'labels': ['cat 1', 'cat 2']
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
        }
      ]
    })
  })
})
