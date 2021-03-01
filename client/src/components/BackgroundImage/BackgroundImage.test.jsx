import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import BackgroundImage from './BackgroundImage';

describe('Background Image component', () => {
  it('should render with the image url passed to it', () => {
    const testId = 'bg-image';
    const imageClass = 'bg-image-class';

    render(<BackgroundImage imageClass={imageClass} testId={testId} />);

    expect(screen.getByTestId(testId)).toHaveClass(imageClass);
  });
});
