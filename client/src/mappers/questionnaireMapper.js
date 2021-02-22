function getAverage(scoreList) {
  const result = scoreList.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  return result / scoreList.length;
}

function generateQuestionnaire(questionnaire) {
  const {
    devSecOps,
    deliveringValue,
    technicalDebt,
    methodology,
    cadence,
    rework,
    pipeline,
    sideEffects,
    transparency,
    learning,
    learnFromFailure,
    careerPath,
    diversity,
    autonomy,
    wholeTeam,
    knowledgeSharing,
    tdd,
    architecture,
    cleanCode,
    peerReview,
  } = questionnaire;

  return {
    organisationalMaturity: {
      score: getAverage([
        devSecOps.score,
        deliveringValue.score,
        technicalDebt.score,
        methodology.score,
      ]),
      subcategories: {
        devSecOps,
        deliveringValue,
        technicalDebt,
        methodology,
      },
    },
    continuousDelivery: {
      score: getAverage([
        cadence.score,
        rework.score,
        pipeline.score,
        sideEffects.score,
      ]),
      subcategories: {
        cadence,
        rework,
        pipeline,
        sideEffects,
      },
    },
    culture: {
      score: getAverage([
        transparency.score,
        learning.score,
        learnFromFailure.score,
        careerPath.score,
      ]),
      subcategories: {
        transparency,
        learning,
        learnFromFailure,
        careerPath,
      },
    },
    crossFunctionalTeams: {
      score: getAverage([
        diversity.score,
        autonomy.score,
        wholeTeam.score,
        knowledgeSharing.score,
      ]),
      subcategories: {
        diversity,
        autonomy,
        wholeTeam,
        knowledgeSharing,
      },
    },
    xpPractices: {
      score: getAverage([
        tdd.score,
        architecture.score,
        cleanCode.score,
        peerReview.score,
      ]),
      subcategories: {
        tdd,
        architecture,
        cleanCode,
        peerReview,
      },
    },
  };
}

export default { generateQuestionnaire };
