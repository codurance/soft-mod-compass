const config = require('./config');
const ENGLISH_PREVIEW_TEXT = "Our software delivery assessment measures the " +
    "current level of maturity of your software development organisation across " +
    "5 areas & includes recommendations for improvements.";
const SPANISH_PREVIEW_TEXT = "Nuestra evaluación de entrega de software permite medir" +
    " el nivel actual de madurez de tu organización de desarrollo de software en " +
    "cinco áreas distintas e incluye recomendaciones para aplicar posibles mejoras.";

function isEnglishVersion() {
    return config.language !== "ES";
}

function getDescription() {
    return isEnglishVersion() ? ENGLISH_PREVIEW_TEXT : SPANISH_PREVIEW_TEXT;
}

module.exports = getDescription;
