import { render } from '@testing-library/react';
import React from 'react';
import InputText from './InputText';

describe('InputText', () => {
  it('should display the firstname fields', () => {
    const { getByLabelText, getByText } = render(<InputText textValue="" />);
    expect(getByText('First Name')).toBeInTheDocument();
    const inputFirstName = getByLabelText('First Name');
    expect(inputFirstName).toBeInTheDocument();
  });

  it('should display the given text value', () => {
    const { getByLabelText } = render(<InputText textValue="ALICE" />);
    const inputFirstName = getByLabelText('First Name');
    expect(inputFirstName.value).toBe('ALICE');
  });
});
