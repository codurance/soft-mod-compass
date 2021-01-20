import { render } from '@testing-library/react';
import React from 'react';
import InputText from './InputText';

const label = 'A label';

describe('InputText', () => {
  it('should display the firstname fields', () => {
    const { getByPlaceholderText } = render(
      <InputText textValue="" onChangeCallBack={() => {}} label={label} />
    );
    expect(getByPlaceholderText(label)).toBeInTheDocument();
    const inputFirstName = getByPlaceholderText(label);
    expect(inputFirstName).toBeInTheDocument();
  });

  it('should display the given text value', () => {
    const { getByPlaceholderText } = render(
      <InputText textValue="ALICE" onChangeCallBack={() => {}} label={label} />
    );
    const inputFirstName = getByPlaceholderText(label);
    expect(inputFirstName.value).toBe('ALICE');
  });
});
