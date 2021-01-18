import { render } from '@testing-library/react';
import React from 'react';
import Welcome from './Welcome';
import {
  welcomeFirstParagraph,
  welcomeSecondParagraph,
} from '../config/en-labels.json';

describe('Welcome', () => {
  it('display 2 paragraphs', () => {
    const { getByText } = render(<Welcome />);
    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(getByText(welcomeSecondParagraph)).toBeInTheDocument();
  });
});
