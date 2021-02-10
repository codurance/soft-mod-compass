const { documentDynamoClient } = require('./dynamodbClient');

const input = {
  id: 'sdf',
  surveyState: 'entireObject',
  user: {
    firstName: 'First Name',
    lastName: 'Last Name',
    company: 'Some Company',
    email: 'martin.garcia3456@codurance.com',
    jobFunction: 'Agile Coach',
    language: 'en',
  },
  categories: {
    organisationalMaturity: {
      score: 65,
      subcategories: {
        devSecOps: {
          score: 100,
          answer: 'stronglyAgree',
        },
        deliveringValue: {
          score: 60,
          answer: 'neitherAgree',
        },
        technicalDebt: {
          score: 80,
          answer: 'agree',
        },
        methodology: {
          score: 20,
          answer: 'stronglyDisagree',
        },
      },
    },
    continuousDelivery: {
      score: 70,
      subcategories: {
        cadence: {
          score: 100,
          answer: 'hourly',
        },
        rework: {
          score: 60,
          answer: 'neitherAgree',
        },
        pipeline: {
          score: 20,
          answer: 'stronglyDisagree',
        },
        sideEffects: {
          score: 100,
          answer: 'stronglyAgree',
        },
      },
    },
    culture: {
      score: 25,
      subcategories: {
        transparency: {
          score: 20,
          answer: 'stronglyDisagree',
        },
        learning: {
          score: 20,
          answer: 'stronglyDisagree',
        },
        learnFromFailure: {
          score: 40,
          answer: 'disagree',
        },
        careerPath: {
          score: 20,
          answer: 'stronglyDisagree',
        },
      },
    },
    crossFunctionalTeams: {
      score: 55,
      subcategories: {
        diversity: {
          score: 100,
          answer: 'stronglyAgree',
        },
        autonomy: {
          score: 40,
          answer: 'disagree',
        },
        wholeTeam: {
          score: 60,
          answer: 'neitherAgree',
        },
        knowledgeSharing: {
          score: 20,
          answer: 'stronglyDisagree',
        },
      },
    },
    xpPractices: {
      score: 80,
      subcategories: {
        tdd: {
          score: 80,
          answer: 'agree',
        },
        architecture: {
          score: 60,
          answer: 'neitherAgree',
        },
        cleanCode: {
          score: 80,
          answer: 'agree',
        },
        peerReview: {
          score: 100,
          answer: 'stronglyAgree',
        },
      },
    },
  },
};
const params = {
  TableName: 'Surveys',
  Item: input,
};

module.exports = async () => {
  documentDynamoClient.put(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};
