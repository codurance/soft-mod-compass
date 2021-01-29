function getAverage(scoreList) {
  const result = scoreList.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  return result / scoreList.length;
}

function generateQuestionnaire(questionnaire) {
  const {
    devSecOps,
    deliveringValue,
    technicalDebt,
    methodology,
  } = questionnaire;

  return {
    organisationalMaturity: {
      score: getAverage([
        devSecOps.score,
        deliveringValue.score,
        technicalDebt.score,
        methodology.score,
      ]),
      subcategories: {
        devSecOps,
        deliveringValue,
        technicalDebt,
        methodology,
      },
    },
    continuousDelivery: {
      score: 50,
      subcategories: {
        cadence: {
          score: 40,
          answer: 'Monthly',
        },
        rework: {
          score: 60,
          answer: 'Neither Agree Nor Disagree',
        },
        pipeline: {
          score: 20,
          answer: 'Strongly Disagree',
        },
        sideEffects: {
          score: 100,
          answer: 'Strongly Agree',
        },
      },
    },
    culture: {
      score: 25,
      subcategories: {
        transparency: {
          score: 20,
          answer: 'Strongly Disagree',
        },
        learning: {
          score: 20,
          answer: 'Strongly Disagree',
        },
        learnFromFailure: {
          score: 40,
          answer: 'Disagree',
        },
        careerPath: {
          score: 20,
          answer: 'Strongly Disagree',
        },
      },
    },
    crossFunctionalTeams: {
      score: 50,
      subcategories: {
        diversity: {
          score: 100,
          answer: 'Strongly Agree',
        },
        autonomy: {
          score: 40,
          answer: 'Disagree',
        },
        wholeTeam: {
          score: 60,
          answer: 'Neither Agree Nor Disagree',
        },
        knowledgeSharing: {
          score: 20,
          answer: 'Strongly Disagree',
        },
      },
    },
    xpPractices: {
      score: 75,
      subcategories: {
        tdd: {
          score: 80,
          answer: 'Agree',
        },
        architecture: {
          score: 60,
          answer: 'Neither Agree Nor Disagree',
        },
        cleanCode: {
          score: 80,
          answer: 'Agree',
        },
        peerReview: {
          score: 100,
          answer: 'Strongly Agree',
        },
      },
    },
  };
}

export default { generateQuestionnaire };
