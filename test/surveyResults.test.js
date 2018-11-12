const surveyResults = require('../src/server/surveyResults')

describe('survey results', () => {
  it('creates survey results', () => {
    const categories = [
      {
        name: 'cat 1',
        low: 'hello lowww',
        medium: 'hello mediums',
        high: 'hello you did well'
      },
      {
        name: 'cat 2',
        low: 'hello this is still low',
        medium: 'hello mediums is ok',
        high: 'HELLO YOU DID WELL'
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

    expect(surveyResults(categories, questionChoices, answers)).toEqual({
      'summaryRadial': {
        'scores': [55, 70],
        'labels': ['cat1', 'cat2'],
      },
      'categories': [
        {
          'name': 'cat 1',
          'content': 'hello mediums',
          'score': 55,
          'subCategoryLabels': ['sub1', 'sub2', 'sub3', 'sub4'],
          'subCategoryScores': [20, 40, 60, 80]
        },
        {
          'name': 'cat 2',
          'content': 'HELLO YOU DID WELL',
          'score': 70,
          'subCategoryLabels': ['sub1', 'sub2', 'sub3', 'sub4'],
          'subCategoryScores': [20, 40, 60, 80]
        }
      ]
    })
  })
})
