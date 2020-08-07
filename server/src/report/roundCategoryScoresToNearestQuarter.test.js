const roundCategoryScoresToNearestQuarter = require('./roundCategoryScoresToNearestQuarter');
describe('roundCategoryScoresToNearestQuarter =>', () => {
  const viewModelWithSingleCategoryOfAverageScore = (categoryAverageScore) => ({
    user: {},
    categories: {
      firstCat: {
        score: categoryAverageScore,
        subcategories: {
          firstSub1: {
            score: categoryAverageScore,
            answer: 'three',
          },
          firstSub2: {
            score: categoryAverageScore,
            answer: 'one',
          },
          firstSub3: {
            score: categoryAverageScore,
            answer: 'two',
          },
          firstSub4: {
            score: categoryAverageScore,
            answer: 'five',
          },
        },
      },
    },
  });

  const scoreOfFirstCategory = (viewModel) =>
    viewModel.categories.firstCat.score;

  const expectedScore = (score) => ({
    toBeRoundedTo: (expectedRoundedScore) => {
      expect(
        scoreOfFirstCategory(
          roundCategoryScoresToNearestQuarter(
            viewModelWithSingleCategoryOfAverageScore(score)
          )
        )
      ).toBe(expectedRoundedScore);
    },
  });

  it('does not change if already on a quarter', () => {
    expectedScore(25).toBeRoundedTo(25);
    expectedScore(50).toBeRoundedTo(50);
    expectedScore(75).toBeRoundedTo(75);
    expectedScore(100).toBeRoundedTo(100);
  });

  it('rounds to the nearest quarter', () => {
    expectedScore(30).toBeRoundedTo(25);
    expectedScore(20).toBeRoundedTo(25);
    expectedScore(37).toBeRoundedTo(25);
    expectedScore(38).toBeRoundedTo(50);
    expectedScore(55).toBeRoundedTo(50);
    expectedScore(77).toBeRoundedTo(75);
    expectedScore(95).toBeRoundedTo(100);
  });

  it('handles multiple categories', () => {
    const firstCategoryAverageScore = 20;
    const secondCategoryAverageScore = 70;

    const viewModelWithMultipleCategories = {
      user: {},
      categories: {
        firstCat: {
          score: firstCategoryAverageScore,
          subcategories: {
            firstSub1: {
              score: firstCategoryAverageScore,
              answer: 'three',
            },
            firstSub2: {
              score: firstCategoryAverageScore,
              answer: 'one',
            },
            firstSub3: {
              score: firstCategoryAverageScore,
              answer: 'two',
            },
            firstSub4: {
              score: firstCategoryAverageScore,
              answer: 'five',
            },
          },
        },
        secondCat: {
          score: secondCategoryAverageScore,
          subcategories: {
            secondSub1: {
              score: secondCategoryAverageScore,
              answer: 'three',
            },
            secondSub2: {
              score: secondCategoryAverageScore,
              answer: 'one',
            },
            secondSub3: {
              score: secondCategoryAverageScore,
              answer: 'two',
            },
            secondSub4: {
              score: secondCategoryAverageScore,
              answer: 'five',
            },
          },
        },
      },
    };

    const viewModelAfterRounding = roundCategoryScoresToNearestQuarter(
      viewModelWithMultipleCategories
    );

    expect(viewModelAfterRounding.categories.firstCat.score).toBe(25);
    expect(viewModelAfterRounding.categories.secondCat.score).toBe(75);
  });
});
