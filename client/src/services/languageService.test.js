import { describe, expect, it } from '@jest/globals';
import languageService from './languageService';

const setUrl = (language) => {
  const location = new URL(`https://www.example.com/${language}`);
  delete window.location;
  window.location = location;
};

describe('language service', () => {
  it('should returns en language', () => {
    const language = languageService.getLanguage();

    expect(language).toEqual('en');
  });

  it('should returns es language', () => {
    setUrl('es');
    const language = languageService.getLanguage();

    expect(language).toEqual('es');
  });
});
