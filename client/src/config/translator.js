import esLang from './es-labels.json';
import enLang from './en-labels.json';

const url = window.location.href;

export default url.includes('/es') ? esLang : enLang;
