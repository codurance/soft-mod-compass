import esLang from './es-labels.json';
import enLang from './en-labels.json';

const { pathname } = window.location;

export default pathname === '/es' ? esLang : enLang;
