import { enLabels, esLabels } from 'translations';
import languageService from '../services/languageService';

const language = languageService.getLanguage();
export default language === 'es' ? esLabels : enLabels;
