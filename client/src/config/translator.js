import esLang from './es-labels.json';
import enLang from './en-labels.json';

const language = localStorage.getItem('language');

export default language === 'es' ? esLang : enLang;
