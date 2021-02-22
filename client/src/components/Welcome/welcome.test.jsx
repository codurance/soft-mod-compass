import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import translator from '../../config/translator';
import Welcome from './Welcome';

const { welcomeFirstParagraph, welcomeSecondParagraph, start } = translator;
const clickCallback = jest.fn();

describe('Welcome', () => {
  it('display 2 paragraphs', () => {
    const { getByText } = render(<Welcome clickCallback={() => {}} />);
    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(getByText(welcomeSecondParagraph)).toBeInTheDocument();
  });

  it('should execute the callback when the user clicks in the button', () => {
    const { getByText } = render(<Welcome clickCallback={clickCallback} />);
    getByText(start).click();

    expect(clickCallback).toHaveBeenCalledTimes(1);
  });
});
