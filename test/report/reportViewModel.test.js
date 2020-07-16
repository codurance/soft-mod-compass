const reportViewModel = require('../../src/server/report/reportViewModel');

describe('survey results', () => {
  test('creates survey results', () => {
    const categories = [
      {
        name: 'cat 1',
        key: 'firstCat',
        subcategoryNames: ['1 sub1', '1 sub2', '1 sub3', '1 sub4'],
      },
      {
        name: 'cat 2',
        key: 'secondCat',
        subcategoryNames: ['2 sub1', '2 sub2', '2 sub3', '2 sub4'],
      },
      {
        name: 'cat 3',
        key: 'thirdCat',
        subcategoryNames: ['3 sub1', '3 sub2', '3 sub3', '3 sub4'],
      },
    ];
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
      ['five', 'four', 'three', 'two', 'one'],
    ];
    const answers = [
      'three',
      'one',
      'two',
      'five',
      'two',
      'five',
      'two',
      'five',
      'one',
      'two',
      'one',
      'two',
    ];
    const userData = {
      submittedAt: 1569250954586,
      values: [
        { name: 'firstname', value: 'Daniel' },
        { name: 'lastname', value: 'Bird' },
        { name: 'company', value: 'Codurance' },
        { name: 'email', value: 'daniel.bird@codurance.com' },
        { name: 'uuid', value: '476cf248-27fe-4f98-8eaa-19d385cc2fbd' },
      ],
      pageUrl:
        'https://info.codurance.com/compass-test?uuid=476cf248-27fe-4f98-8eaa-19d385cc2fbd&scores=NjAsNjAsNjAsNjAsNjA=',
    };

    const result = reportViewModel(
      categories,
      questionChoices,
      answers,
      userData
    );

    expect(result).toEqual({
      user: {
        firstName: 'Daniel',
        lastName: 'Bird',
        company: 'Codurance',
        email: 'daniel.bird@codurance.com',
      },
      categories: {
        firstCat: {
          score: 55,
          subcategoryScores: [60, 20, 40, 100],
        },
        secondCat: {
          score: 70,
          subcategoryScores: [40, 100, 40, 100],
        },
        thirdCat: {
          score: 30,
          subcategoryScores: [20, 40, 20, 40],
        },
      },
    });
    expect(answers).not.toHaveLength(0);
  });

  test('throws error when category key contains space', () => {
    const categories = [
      {
        name: 'cat 1',
        key: 'there is a space',
        subcategoryNames: ['1 sub1'],
      },
      {
        name: 'cat 2',
        key: 'secondCat',
        subcategoryNames: ['2 sub1'],
      },
    ];

    expect(() => {
      reportViewModel(categories, null, null, null);
    }).toThrowError(/Category key can not contain space/);
  });
});
