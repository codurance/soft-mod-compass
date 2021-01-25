import { describe, expect, it, beforeEach } from '@jest/globals';
import languageService from './languageService';

const setUrl = (language) => {
  const location = new URL(`https://www.example.com/${language}`);
  delete window.location;
  window.location = location;
};

beforeEach(() => {
  const location = new URL(`https://www.example.com/`);
  delete window.location;
  window.location = location;
});

describe('language service', () => {
  it('get language should returns en language', () => {
    const language = languageService.getLanguage();

    expect(language).toEqual('en');
  });

  it('get language should returns es language', () => {
    setUrl('es');
    const language = languageService.getLanguage();

    expect(language).toEqual('es');
  });

  it('get title should returns en title', () => {
    const title = languageService.getTitle();

    expect(title).toEqual('Compass by Codurance | Assessment Tool');
  });

  it('get title should returns es title', () => {
    setUrl('es');
    const title = languageService.getTitle();

    expect(title).toEqual('Compass by Codurance | Herramienta de evaluación');
  });
});
