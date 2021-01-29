import fetch from 'node-fetch';
import config from '../config/config';
import languageService from './languageService';

export default {
  submitSurvey(surveyData) {
    const bodyPayload = {
      user: {
        firstName: surveyData.firstName,
        lastName: surveyData.lastName,
        company: surveyData.companyName,
        email: surveyData.email,
        language: languageService.getLanguage(),
      },
      categories: {
        organisationalMaturity: {
          score: 75,
          subcategories: {
            devSecOps: surveyData.questionnaire.devSecOps,
            deliveringValue: surveyData.questionnaire.deliveringValue,
            technicalDebt: surveyData.questionnaire.technicalDebt,
            methodology: surveyData.questionnaire.methodology,
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
      },
    };
    return fetch(`${config.reportServerBaseUrl}/surveys`, {
      method: 'POST',
      body: JSON.stringify(bodyPayload),
      headers: { 'Content-Type': 'application/json' },
    }).then((success) => {
      console.log('response successful ', success);
      return { status: 'ok' };
    });
  },
};
