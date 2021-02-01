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

const cadenceAnswers = [
  {
    label: 'hourly',
    score: 100,
  },
  {
    label: 'daily',
    score: 80,
  },
  {
    label: 'weekly',
    score: 60,
  },
  {
    label: 'monthly',
    score: 40,
  },
  {
    label: 'lessThanMonthly',
    score: 20,
  },
  {
    label: 'notSure',
    score: 20,
  },
];

const questionList = [
  {
    label: 'devSecOps',
    answers: standardAnswers,
  },
  {
    label: 'deliveringValue',
    answers: standardAnswers,
  },
  {
    label: 'technicalDebt',
    answers: standardAnswers,
  },
  {
    label: 'methodology',
    answers: standardAnswers,
  },
  {
    label: 'cadence',
    answers: cadenceAnswers,
  },
  {
    label: 'rework',
    answers: standardAnswers,
  },
  {
    label: 'pipeline',
    answers: standardAnswers,
  },
  {
    label: 'sideEffects',
    answers: standardAnswers,
  },
  {
    label: 'transparency',
    answers: standardAnswers,
  },
  {
    label: 'learning',
    answers: standardAnswers,
  },
  {
    label: 'learnFromFailure',
    answers: standardAnswers,
  },
  {
    label: 'careerPath',
    answers: standardAnswers,
  },
  {
    label: 'diversity',
    answers: standardAnswers,
  },
  {
    label: 'autonomy',
    answers: standardAnswers,
  },
  {
    label: 'wholeTeam',
    answers: standardAnswers,
  },
  {
    label: 'knowledgeSharing',
    answers: standardAnswers,
  },
  {
    label: 'tdd',
    answers: standardAnswers,
  },
  {
    label: 'architecture',
    answers: standardAnswers,
  },
  {
    label: 'cleanCode',
    answers: standardAnswers,
  },
  {
    label: 'peerReview',
    answers: standardAnswers,
  },
];

export default questionList;
