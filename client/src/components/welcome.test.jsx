import { render } from '@testing-library/react';
import React from 'react';
import {
  welcomeFirstParagraph,
  welcomeSecondParagraph,
} from '../config/en-labels.json';
import Welcome from './Welcome';

const clickCallback = jest.fn();

describe('Welcome', () => {
  it('display 2 paragraphs', () => {
    const { getByText } = render(<Welcome clickCallback={() => {}} />);
    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(getByText(welcomeSecondParagraph)).toBeInTheDocument();
  });

  it('should execute the callback when the user clicks in the button', () => {
    const { getByText } = render(<Welcome clickCallback={clickCallback} />);
    getByText('Start').click();

    expect(clickCallback).toHaveBeenCalledTimes(1);
  });
});
