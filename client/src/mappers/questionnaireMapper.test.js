import { describe, expect, it } from '@jest/globals';
import questionnaireMapper from './questionnaireMapper';

const fakeQuestionnaire = {
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
};

describe('SurveyMapper should', () => {
  it('generate the object that contains organisationalMaturity category with the right values', () => {
    const {
      organisationalMaturity,
    } = questionnaireMapper.generateQuestionnaire(fakeQuestionnaire);
    const { subcategories, score } = organisationalMaturity;
    expect(score).toEqual(65);
    expect(subcategories.devSecOps).toEqual({
      score: 100,
      answer: 'stronglyAgree',
    });
    expect(subcategories.deliveringValue).toEqual({
      score: 60,
      answer: 'neitherAgree',
    });
    expect(subcategories.technicalDebt).toEqual({ score: 80, answer: 'agree' });
    expect(subcategories.methodology).toEqual({
      score: 20,
      answer: 'stronglyDisagree',
    });
  });

  it('generate the object that contains continuousDelivery category with the right values', () => {
    const { continuousDelivery } = questionnaireMapper.generateQuestionnaire(
      fakeQuestionnaire
    );
    const { subcategories, score } = continuousDelivery;
    expect(score).toEqual(70);
    expect(subcategories.cadence).toEqual({
      score: 100,
      answer: 'hourly',
    });
    expect(subcategories.rework).toEqual({
      score: 60,
      answer: 'neitherAgree',
    });
    expect(subcategories.pipeline).toEqual({
      score: 20,
      answer: 'stronglyDisagree',
    });
    expect(subcategories.sideEffects).toEqual({
      score: 100,
      answer: 'stronglyAgree',
    });
  });

  it('generate the object that contains culture category with the right values', () => {
    const { culture } = questionnaireMapper.generateQuestionnaire(
      fakeQuestionnaire
    );
    const { subcategories, score } = culture;
    expect(score).toEqual(25);
    expect(subcategories.transparency).toEqual({
      score: 20,
      answer: 'stronglyDisagree',
    });
    expect(subcategories.learning).toEqual({
      score: 20,
      answer: 'stronglyDisagree',
    });
    expect(subcategories.learnFromFailure).toEqual({
      score: 40,
      answer: 'disagree',
    });
    expect(subcategories.careerPath).toEqual({
      score: 20,
      answer: 'stronglyDisagree',
    });
  });

  it('generate the object that contains crossFunctionalTeams category with the right values', () => {
    const { crossFunctionalTeams } = questionnaireMapper.generateQuestionnaire(
      fakeQuestionnaire
    );
    const { subcategories, score } = crossFunctionalTeams;
    expect(score).toEqual(55);
    expect(subcategories.diversity).toEqual({
      score: 100,
      answer: 'stronglyAgree',
    });
    expect(subcategories.autonomy).toEqual({
      score: 40,
      answer: 'disagree',
    });
    expect(subcategories.wholeTeam).toEqual({
      score: 60,
      answer: 'neitherAgree',
    });
    expect(subcategories.knowledgeSharing).toEqual({
      score: 20,
      answer: 'stronglyDisagree',
    });
  });

  it('generate the object that contains xpPractices category with the right values', () => {
    const { xpPractices } = questionnaireMapper.generateQuestionnaire(
      fakeQuestionnaire
    );
    const { subcategories, score } = xpPractices;
    expect(score).toEqual(80);
    expect(subcategories.tdd).toEqual({
      score: 80,
      answer: 'agree',
    });
    expect(subcategories.architecture).toEqual({
      score: 60,
      answer: 'neitherAgree',
    });
    expect(subcategories.cleanCode).toEqual({
      score: 80,
      answer: 'agree',
    });
    expect(subcategories.peerReview).toEqual({
      score: 100,
      answer: 'stronglyAgree',
    });
  });
});
