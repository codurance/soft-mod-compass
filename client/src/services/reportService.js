import fetch from 'node-fetch';
import config from '../config/config';
import ipProvider from './ipProvider';
import languageService from './languageService';
import cookieService from './cookieService';

export default {
  async submitSurvey(surveyData) {
    const bodyPayload = {
      user: {
        ip: await ipProvider.getIp(),
        firstName: surveyData.firstName,
        lastName: surveyData.lastName,
        company: surveyData.companyName,
        email: surveyData.email,
        jobFunction: surveyData.jobFunction,
        language: languageService.getLanguage(),
        hutk: cookieService.getCookie('hubspotutk'),
      },
      categories: surveyData.categories,
    };
    return fetch(`${config.reportServerBaseUrl}/surveys`, {
      method: 'POST',
      body: JSON.stringify(bodyPayload),
      headers: { 'Content-Type': 'application/json' },
    }).then((success) => {
      // eslint-disable-next-line no-console
      console.log('response successful ', success);
      return { status: 'ok' };
    });
  },
};
