import { render } from '@testing-library/react';
import React from 'react';
import InputText from './InputText';

const label = 'A label';

describe('InputText', () => {
  it('should display the firstname fields', () => {
    const { getByLabelText, getByText } = render(
      <InputText textValue="" onChangeCallBack={() => {}} label={label} />
    );
    expect(getByText(label)).toBeInTheDocument();
    const inputFirstName = getByLabelText(label);
    expect(inputFirstName).toBeInTheDocument();
  });

  it('should display the given text value', () => {
    const { getByLabelText } = render(
      <InputText textValue="ALICE" onChangeCallBack={() => {}} label={label} />
    );
    const inputFirstName = getByLabelText(label);
    expect(inputFirstName.value).toBe('ALICE');
  });
});
