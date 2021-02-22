import { fireEvent } from '@testing-library/dom';
import translator from '../config/translator';
import userFormValues from '../config/userFormValues';

const { firstName, lastName, companyName, email } = translator;

export default {
  fillUserForm(getByPlaceholderText, getByTestId) {
    const userFirstName = 'First Name';
    const userLastName = 'Last Name';
    const userCompany = 'Some Company';
    const userEmail = 'user@company.com';
    const inputFirstName = getByPlaceholderText(firstName);
    fireEvent.change(inputFirstName, { target: { value: userFirstName } });

    const inputLastName = getByPlaceholderText(lastName);
    fireEvent.change(inputLastName, { target: { value: userLastName } });

    const inputCompany = getByPlaceholderText(companyName);
    fireEvent.change(inputCompany, { target: { value: userCompany } });

    fireEvent.change(getByTestId('select'), {
      target: { value: userFormValues[0] },
    });

    const inputEmail = getByPlaceholderText(email);
    fireEvent.change(inputEmail, { target: { value: userEmail } });

    const gdprCheckbox = getByTestId('gdprCheckbox');
    fireEvent.click(gdprCheckbox);
  },
};
