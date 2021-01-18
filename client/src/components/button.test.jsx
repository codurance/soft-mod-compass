import { render } from '@testing-library/react';
import React from 'react';
import Button from './Button';

const buttonLabel = 'This is a label';
const callback = jest.fn();

describe('Button', () => {
  it('given a label should render a button', () => {
    const { getByText } = render(
      <Button label={buttonLabel} clickCallback={() => {}} />
    );

    expect(getByText(buttonLabel)).toBeInTheDocument();
  });

  it('should executes the clickCallback when the user clicks', () => {
    const { getByText } = render(
      <Button label={buttonLabel} clickCallback={callback} />
    );

    getByText(buttonLabel).click();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
