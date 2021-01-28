const standardAnswers = [
  {
    label: 'stronglyAgree',
    score: 100,
  },
  {
    label: 'agree',
    score: 80,
  },
  {
    label: 'neitherAgree',
    score: 60,
  },
  {
    label: 'disagree',
    score: 40,
  },
  {
    label: 'stronglyDisagree',
    score: 20,
  },
];

const questionList = [
  {
    label: 'devSecOps',
    answers: standardAnswers,
    next: 'deliveringValue',
  },
  {
    label: 'deliveringValue',
    answers: standardAnswers,
  },
];

export default questionList;
