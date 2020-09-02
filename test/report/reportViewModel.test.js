const reportViewModel = require('../../src/server/report/reportViewModel');

describe('survey results', () => {
  test('creates survey results', () => {
    const categories = [
      {
        key: 'firstCat',
        subcategoryKeys: ['firstSub1', 'firstSub2', 'firstSub3', 'firstSub4'],
      },
      {
        key: 'secondCat',
        subcategoryKeys: [
          'secondSub1',
          'secondSub2',
          'secondSub3',
          'secondSub4',
        ],
      },
      {
        key: 'thirdCat',
        subcategoryKeys: ['thirdSub1', 'thirdSub2', 'thirdSub3', 'thirdSub4'],
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
    const formSubmission = {
      firstName: 'first name',
      lastName: 'last name',
      company: 'some company',
      email: 'daniel.bird@codurance.com',
      uuid: '476cf248-27fe-4f98-8eaa-19d385cc2fbd',
    };

    const result = reportViewModel(
      categories,
      questionChoices,
      answers,
      formSubmission
    );

    expect(result).toEqual({
      user: {
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Some Company',
        email: 'daniel.bird@codurance.com',
      },
      categories: {
        firstCat: {
          score: 55,
          subcategories: {
            firstSub1: {
              score: 60,
              answer: 'three',
            },
            firstSub2: {
              score: 20,
              answer: 'one',
            },
            firstSub3: {
              score: 40,
              answer: 'two',
            },
            firstSub4: {
              score: 100,
              answer: 'five',
            },
          },
        },
        secondCat: {
          score: 70,
          subcategories: {
            secondSub1: {
              score: 40,
              answer: 'two',
            },
            secondSub2: {
              score: 100,
              answer: 'five',
            },
            secondSub3: {
              score: 40,
              answer: 'two',
            },
            secondSub4: {
              score: 100,
              answer: 'five',
            },
          },
        },
        thirdCat: {
          score: 30,
          subcategories: {
            thirdSub1: {
              score: 20,
              answer: 'one',
            },
            thirdSub2: {
              score: 40,
              answer: 'two',
            },
            thirdSub3: {
              score: 20,
              answer: 'one',
            },
            thirdSub4: {
              score: 40,
              answer: 'two',
            },
          },
        },
      },
    });
  });

  describe("Error with 'keys'", () => {
    const expectedErrorRegex = /Category key can not contain space, start with capital letter or start with number/;

    it('throws error when category key contains space', () => {
      const categoryWithSpace = [
        {
          key: 'there is a space',
          subcategoryKeys: ['abc'],
        },
      ];

      expect(() => {
        reportViewModel(categoryWithSpace, null, null, null);
      }).toThrowError(expectedErrorRegex);
    });

    it('throws error when subcategory key contains space', () => {
      const subcategoryWithSpace = [
        {
          key: 'asdfasdf',
          subcategoryKeys: ['there is a space'],
        },
      ];

      expect(() => {
        reportViewModel(subcategoryWithSpace, null, null, null);
      }).toThrowError(expectedErrorRegex);
    });

    it('throws error when category key starts with capital letter', () => {
      const categories = [
        {
          key: 'StartsWithACapitalLetter',
          subcategoryKeys: ['abc'],
        },
      ];

      expect(() => {
        reportViewModel(categories, null, null, null);
      }).toThrowError(expectedErrorRegex);
    });

    it('throws error when subcategory key starts with capital letter', () => {
      const subcategoryWithCapitalLetter = [
        {
          key: 'abc',
          subcategoryKeys: ['StartsWithACapitalLetter'],
        },
      ];

      expect(() => {
        reportViewModel(subcategoryWithCapitalLetter, null, null, null);
      }).toThrowError(expectedErrorRegex);
    });

    it('throws error when category key starts with number', () => {
      const categories = [
        {
          key: '9startsWithANumber',
          subcategoryKeys: ['abc'],
        },
      ];

      expect(() => {
        reportViewModel(categories, null, null, null);
      }).toThrowError(expectedErrorRegex);
    });

    it('throws error when subcategory key starts with number', () => {
      const categories = [
        {
          key: 'secondCat',
          subcategoryKeys: ['9startsWithANumber'],
        },
      ];

      expect(() => {
        reportViewModel(categories, null, null, null);
      }).toThrowError(expectedErrorRegex);
    });
  });
});
