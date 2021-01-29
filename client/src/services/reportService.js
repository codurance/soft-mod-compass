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
      categories: surveyData.categories,
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
