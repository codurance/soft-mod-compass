import { render } from '@testing-library/react';
import each from 'jest-each';
import { fireEvent } from '@testing-library/dom';
import React from 'react';
import UserForm from './UserForm';

const initialState = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
};

describe('UserForm ', () =>
  each([
    ['First Name', 'Alice'],
    ['Last Name', 'Cooper'],
    ['Company Name', 'Codurance'],
    ['Email', 'alice.cooper@codurance.com'],
  ]).it(
    'should change the text value of the firstname input field when the firstname field is changed',
    (labelName, expectedTextValue) => {
      const { getByLabelText } = render(
        <UserForm initialState={initialState} updateUserForm={() => {}} />
      );
      const inputFirstName = getByLabelText(labelName);
      expect(inputFirstName.value).not.toBe(expectedTextValue);
      fireEvent.change(inputFirstName, {
        target: { value: expectedTextValue },
      });
      expect(inputFirstName.value).toBe(expectedTextValue);
    }
  ));
