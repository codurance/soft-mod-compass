import { describe, expect, it, jest } from '@jest/globals';
import cookieService from './cookieService';

const documentCookieMock = jest.spyOn(cookieService, 'documentCookies');

const cookiesWithoutExpected =
  'test1=Hello; test2=World; test3=mockedCookie; name=Craftsperson;';
const cookiesIncludingExpected = `${cookiesWithoutExpected} expectedcookie=exists`;

describe('cookie service', () => {
  it('should return a cookie if present', () => {
    documentCookieMock.mockImplementation(() => cookiesIncludingExpected);
    expect(cookieService.getCookie('expectedcookie')).toBe('exists');
  });

  it('should return null if cookies is not present', () => {
    documentCookieMock.mockImplementation(() => cookiesWithoutExpected);
    expect(cookieService.getCookie('expectedcookie')).toBe(null);
  });
});
