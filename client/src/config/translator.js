import esLang from './es-labels.json';
import enLang from './en-labels.json';
import languageService from '../services/languageService';

const language = languageService.getLanguage();
export default language === 'es' ? esLang : enLang;
