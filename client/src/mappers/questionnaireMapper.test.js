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
};

describe('SurveyMapper should', () => {
  it('generate the object that contains organisationalMaturity category with the rigth values', () => {
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
});
