const config = require('./config');

const ENGLISH_PREVIEW_TEXT = "Our software delivery assessment measures the " +
    "current level of maturity of your software development organisation across " +
    "5 areas & includes recommendations for improvements.";
const SPANISH_PREVIEW_TEXT = "Nuestra evaluación de entrega de software permite medir" +
    " el nivel actual de madurez de tu organización de desarrollo de software en " +
    "cinco áreas distintas e incluye recomendaciones para aplicar posibles mejoras.";
const ENGLISH_TITLE = "Compass by Codurance | Assessment Tool"
const SPANISH_TITLE = "Compass by Codurance | Herramienta de evaluación"

function getDescription() {
    return config.isESVersion ? SPANISH_PREVIEW_TEXT : ENGLISH_PREVIEW_TEXT;
}

function getTitle() {
    return config.isESVersion ? SPANISH_TITLE : ENGLISH_TITLE
}

module.exports = {getDescription, getTitle};
