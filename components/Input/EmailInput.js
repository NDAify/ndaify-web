import React, { useCallback } from 'react';
import { useField } from 'formik';

import getEmailSuggestions from '../../utils/getEmailSuggestions';

import Input from './Input';

const getEmailSuggestion = (email) => {
  if (email) {
    const correctedEmail = getEmailSuggestions(email);
    if (correctedEmail) {
      return correctedEmail;
    }
  }

  return null;
};

const EmailInput = ({ onEmailSuggest, ...props }) => {
  const [field] = useField(props);

  const handleChange = (e) => {
    onEmailSuggest(getEmailSuggestion(e.target.value));
    field.onChange(e);
  };

  const onChange = useCallback(handleChange);

  return (
    <Input
      {...props}
      onChange={onChange}
    />
  );
};

export default EmailInput;
