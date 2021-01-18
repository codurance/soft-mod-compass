import { render } from '@testing-library/react';
import React from 'react';
import {
  welcomeFirstParagraph,
  welcomeSecondParagraph,
} from '../config/en-labels.json';
import Welcome from './Welcome';

describe('Welcome', () => {
  it('display 2 paragraphs', () => {
    const { getByText } = render(<Welcome />);
    expect(getByText(welcomeFirstParagraph)).toBeInTheDocument();
    expect(getByText(welcomeSecondParagraph)).toBeInTheDocument();
  });
});
