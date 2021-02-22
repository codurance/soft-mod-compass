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
    category: 'organisationalMaturity',
  },
  {
    label: 'deliveringValue',
    answers: standardAnswers,
    category: 'organisationalMaturity',
  },
  {
    label: 'technicalDebt',
    answers: standardAnswers,
    category: 'organisationalMaturity',
  },
  {
    label: 'methodology',
    answers: standardAnswers,
    category: 'organisationalMaturity',
  },
  {
    label: 'diversity',
    answers: standardAnswers,
    category: 'crossFunctionalTeams',
  },
  {
    label: 'autonomy',
    answers: standardAnswers,
    category: 'crossFunctionalTeams',
  },
  {
    label: 'wholeTeam',
    answers: standardAnswers,
    category: 'crossFunctionalTeams',
  },
  {
    label: 'knowledgeSharing',
    answers: standardAnswers,
    category: 'crossFunctionalTeams',
  },
  {
    label: 'cadence',
    answers: cadenceAnswers,
    category: 'continuousDelivery',
  },
  {
    label: 'rework',
    answers: standardAnswers,
    category: 'continuousDelivery',
  },
  {
    label: 'pipeline',
    answers: standardAnswers,
    category: 'continuousDelivery',
  },
  {
    label: 'sideEffects',
    answers: standardAnswers,
    category: 'continuousDelivery',
  },
  {
    label: 'tdd',
    answers: standardAnswers,
    category: 'xpPractices',
  },
  {
    label: 'architecture',
    answers: standardAnswers,
    category: 'xpPractices',
  },
  {
    label: 'cleanCode',
    answers: standardAnswers,
    category: 'xpPractices',
  },
  {
    label: 'peerReview',
    answers: standardAnswers,
    category: 'xpPractices',
  },
  {
    label: 'transparency',
    answers: standardAnswers,
    category: 'culture',
  },
  {
    label: 'learning',
    answers: standardAnswers,
    category: 'culture',
  },
  {
    label: 'learnFromFailure',
    answers: standardAnswers,
    category: 'culture',
  },
  {
    label: 'careerPath',
    answers: standardAnswers,
    category: 'culture',
  },
];

export default questionList;
