const Joi = require('joi');

const scoreSchema = Joi.number().required();
const commonAnswer = Joi.object({
  score: Joi.number().required(),
  answer: Joi.string()
    .pattern(
      new RegExp(
        '^(stronglyAgree|agree|neitherAgree|disagree|stronglyDisagree)$'
      )
    )
    .required(),
}).required();
const cadenceAnswer = Joi.object({
  score: Joi.number().required(),
  answer: Joi.string()
    .pattern(
      new RegExp('^(hourly|daily|weekly|monthly|lessThanMonthly|notSure)$')
    )
    .required(),
}).required();

const schema = Joi.object({
  user: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    company: Joi.string().required(),
    email: Joi.string().required(),
    language: Joi.string().required(),
    jobFunction: Joi.string().required(),
    ip: Joi.string().required(),
  }).required(),
  categories: Joi.object({
    organisationalMaturity: Joi.object({
      score: scoreSchema,
      subcategories: Joi.object({
        devSecOps: commonAnswer,
        deliveringValue: commonAnswer,
        technicalDebt: commonAnswer,
        methodology: commonAnswer,
      }).required(),
    }).required(),
    continuousDelivery: Joi.object({
      score: scoreSchema,
      subcategories: Joi.object({
        cadence: cadenceAnswer,
        rework: commonAnswer,
        pipeline: commonAnswer,
        sideEffects: commonAnswer,
      }).required(),
    }).required(),
    culture: Joi.object({
      score: scoreSchema,
      subcategories: Joi.object({
        transparency: commonAnswer,
        learning: commonAnswer,
        learnFromFailure: commonAnswer,
        careerPath: commonAnswer,
      }).required(),
    }).required(),
    crossFunctionalTeams: Joi.object({
      score: scoreSchema,
      subcategories: Joi.object({
        diversity: commonAnswer,
        autonomy: commonAnswer,
        wholeTeam: commonAnswer,
        knowledgeSharing: commonAnswer,
      }).required(),
    }).required(),
    xpPractices: Joi.object({
      score: scoreSchema,
      subcategories: Joi.object({
        tdd: commonAnswer,
        architecture: commonAnswer,
        cleanCode: commonAnswer,
        peerReview: commonAnswer,
      }).required(),
    }).required(),
  }).required(),
});

function surveyValidation(survey) {
  return schema.validateAsync(survey);
}

module.exports = { surveyValidation };
