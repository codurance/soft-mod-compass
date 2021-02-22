import { describe, expect, it } from '@jest/globals';
import progressBarMapper from './progressBarMapper';

describe('Progress Bar Mapper should', () => {
  it('generate a object with 1 category and 1 question uncomplete', () => {
    const expectedProgressBar = [
      {
        category: 'organisationalMaturity',
        questions: [{ label: 'devSecOps', isCompleted: false }],
      },
    ];

    // GIVEN
    const emptyQuestionnaire = {};
    const questionList = [
      {
        label: 'devSecOps',
        answers: [],
        category: 'organisationalMaturity',
      },
    ];

    // WHEN
    const progressBar = progressBarMapper.generateProgressBar(
      emptyQuestionnaire,
      questionList
    );

    // THEN
    expect(progressBar).toEqual(expectedProgressBar);
  });

  it('generate a object with 1 category and 1 question completed', () => {
    const expectedProgressBar = [
      {
        category: 'organisationalMaturity',
        questions: [{ label: 'devSecOps', isCompleted: true }],
      },
    ];

    // GIVEN
    const QuestionnaireWithOneQuestion = {
      devSecOps: {
        score: 100,
        answer: 'stronglyAgree',
      },
    };
    const questionList = [
      {
        label: 'devSecOps',
        answers: [],
        category: 'organisationalMaturity',
      },
    ];

    // WHEN
    const progressBar = progressBarMapper.generateProgressBar(
      QuestionnaireWithOneQuestion,
      questionList
    );

    // THEN
    expect(progressBar).toEqual(expectedProgressBar);
  });

  it('generate a object with 1 category and 2 question completed', () => {
    const expectedProgressBar = [
      {
        category: 'organisationalMaturity',
        questions: [
          { label: 'devSecOps', isCompleted: true },
          { label: 'anotherLabel', isCompleted: true },
        ],
      },
    ];

    // GIVEN
    const QuestionnaireWithOneQuestion = {
      devSecOps: {
        score: 100,
        answer: 'stronglyAgree',
      },
      anotherLabel: {
        score: 100,
        answer: 'stronglyAgree',
      },
    };
    const questionList = [
      {
        label: 'devSecOps',
        answers: [],
        category: 'organisationalMaturity',
      },
      {
        label: 'anotherLabel',
        answers: [],
        category: 'organisationalMaturity',
      },
    ];

    // WHEN
    const progressBar = progressBarMapper.generateProgressBar(
      QuestionnaireWithOneQuestion,
      questionList
    );

    // THEN
    expect(progressBar).toEqual(expectedProgressBar);
  });

  it('generate a object with 2 category and 2 question completed for each', () => {
    const expectedProgressBar = [
      {
        category: 'organisationalMaturity',
        questions: [
          { label: 'devSecOps', isCompleted: true },
          { label: 'anotherLabel', isCompleted: true },
        ],
      },
      {
        category: 'cat2',
        questions: [
          { label: 'qu1cat2', isCompleted: true },
          { label: 'qu2cat2', isCompleted: true },
        ],
      },
    ];

    // GIVEN
    const QuestionnaireWithOneQuestion = {
      devSecOps: {
        score: 100,
        answer: 'stronglyAgree',
      },
      anotherLabel: {
        score: 100,
        answer: 'stronglyAgree',
      },
      qu1cat2: {
        score: 100,
        answer: 'stronglyAgree',
      },
      qu2cat2: {
        score: 100,
        answer: 'stronglyAgree',
      },
    };
    const questionList = [
      {
        label: 'devSecOps',
        answers: [],
        category: 'organisationalMaturity',
      },
      {
        label: 'anotherLabel',
        answers: [],
        category: 'organisationalMaturity',
      },
      {
        label: 'qu1cat2',
        answers: [],
        category: 'cat2',
      },
      {
        label: 'qu2cat2',
        answers: [],
        category: 'cat2',
      },
    ];

    // WHEN
    const progressBar = progressBarMapper.generateProgressBar(
      QuestionnaireWithOneQuestion,
      questionList
    );

    // THEN
    expect(progressBar).toEqual(expectedProgressBar);
  });

  it('generate a object with 2 category and 2 question completed for only first category', () => {
    const expectedProgressBar = [
      {
        category: 'organisationalMaturity',
        questions: [
          { label: 'devSecOps', isCompleted: true },
          { label: 'anotherLabel', isCompleted: true },
        ],
      },
      {
        category: 'cat2',
        questions: [
          { label: 'qu1cat2', isCompleted: false },
          { label: 'qu2cat2', isCompleted: false },
        ],
      },
    ];

    // GIVEN
    const QuestionnaireWithTwoQuestion = {
      devSecOps: {
        score: 100,
        answer: 'stronglyAgree',
      },
      anotherLabel: {
        score: 100,
        answer: 'stronglyAgree',
      },
    };
    const questionList = [
      {
        label: 'devSecOps',
        answers: [],
        category: 'organisationalMaturity',
      },
      {
        label: 'anotherLabel',
        answers: [],
        category: 'organisationalMaturity',
      },
      {
        label: 'qu1cat2',
        answers: [],
        category: 'cat2',
      },
      {
        label: 'qu2cat2',
        answers: [],
        category: 'cat2',
      },
    ];

    // WHEN
    const progressBar = progressBarMapper.generateProgressBar(
      QuestionnaireWithTwoQuestion,
      questionList
    );

    // THEN
    expect(progressBar).toEqual(expectedProgressBar);
  });
});
