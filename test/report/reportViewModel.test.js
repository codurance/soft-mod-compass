const reportViewModel = require('../../src/server/report/reportViewModel')

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
    const userData = [
      {
        'submittedAt': 1569250954586,
        'values': [
          { 'name': 'firstname', 'value': 'Daniel' },
          { 'name': 'lastname', 'value': 'Bird' },
          { 'name': 'company', 'value': 'Codurance' },
          { 'name': 'email', 'value': 'daniel.bird@codurance.com' },
          { 'name': 'uuid', 'value': '476cf248-27fe-4f98-8eaa-19d385cc2fbd' }
        ],
        'pageUrl': 'https://info.codurance.com/compass-test?uuid=476cf248-27fe-4f98-8eaa-19d385cc2fbd&scores=NjAsNjAsNjAsNjAsNjA='
      }
    ]

    const result = reportViewModel(categories, questionChoices, answers, userData)

    expect(result).toEqual({
      'userData':
      {
        'submittedAt': 1569250954586,
        'values': [
          { 'name': 'firstname', 'value': 'Daniel' },
          { 'name': 'lastname', 'value': 'Bird' },
          { 'name': 'company', 'value': 'Codurance' },
          { 'name': 'email', 'value': 'daniel.bird@codurance.com' },
          { 'name': 'uuid', 'value': '476cf248-27fe-4f98-8eaa-19d385cc2fbd' }
        ],
        'pageUrl': 'https://info.codurance.com/compass-test?uuid=476cf248-27fe-4f98-8eaa-19d385cc2fbd&scores=NjAsNjAsNjAsNjAsNjA='
      },
      'scores': [55, 70, 30],
      'summaryRadial': {
        'scores': [55, 70, 30],
        'labels': ['cat 1', 'cat 2', 'cat 3']
      },
      'categories': [
        {
          'name': 'cat 1',
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
