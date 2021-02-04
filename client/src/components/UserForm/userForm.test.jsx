import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent } from '@testing-library/dom';
import { act, render } from '@testing-library/react';
import each from 'jest-each';
import React from 'react';
import translator from '../../config/translator';
import UserForm from './UserForm';
import testHelpers from '../../mockdata/testHelpers';

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

it('should call submitForm when user clicks in the button', async () => {
  const { getByText, getByPlaceholderText } = render(
    <UserForm
      initialState={initialState}
      updateUserForm={() => {}}
      submitForm={clickCallback}
    />
  );
  testHelpers.fillUserForm(getByPlaceholderText);
  await act(async () => {
    fireEvent.click(getByText(submit));
  });
  expect(clickCallback).toHaveBeenCalledTimes(1);
});
