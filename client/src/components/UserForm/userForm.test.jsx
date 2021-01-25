import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import translator from '../../config/translator';
import UserForm from './UserForm';

const { firstName, lastName, companyName, email, submit } = translator;

const initialState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};
const clickCallback = jest.fn();

describe('UserForm ', () =>
  each([
    [firstName, 'Alice'],
    [lastName, 'Cooper'],
    [companyName, 'Codurance'],
    [email, 'alice.cooper@codurance.com'],
  ]).it(
    'should change the text value of the firstname input field when the firstname field is changed',
    (labelName, expectedTextValue) => {
      const { getByPlaceholderText } = render(
        <UserForm
          initialState={initialState}
          updateUserForm={() => {}}
          submitForm={() => {}}
        />
      );
      const inputFirstName = getByPlaceholderText(labelName);
      expect(inputFirstName.value).not.toBe(expectedTextValue);
      fireEvent.change(inputFirstName, {
        target: { value: expectedTextValue },
      });
      expect(inputFirstName.value).toBe(expectedTextValue);
    }
  ));

it('should call submitForm when user clicks in the button', () => {
  const { getByText } = render(
    <UserForm
      initialState={initialState}
      updateUserForm={() => {}}
      submitForm={clickCallback}
    />
  );

  const submitButton = getByText(submit);
  fireEvent.click(submitButton);

  expect(clickCallback).toHaveBeenCalledTimes(1);
});
