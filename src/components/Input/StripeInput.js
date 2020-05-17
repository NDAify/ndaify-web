import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CardElement as StripeCardElement } from '@stripe/react-stripe-js';
import { useField } from 'formik';

const CardElement = styled(StripeCardElement)`
  border-radius: var(--ndaify-input-radius);
  padding: 18px;
  height: 60px;
  width: 100%;
  background: #FFFFFF;
  box-sizing: border-box;
`;

const cardStyle = {
  style: {
    base: {
      iconColor: '#000000',
      color: '#000000',
      fontFamily: 'Raleway, sans-serif',
      fontWeight: '200',
      fontSmoothing: 'antialiased',
      fontSize: '20px',
      ':-webkit-autofill': {
        color: '#FFFFFF',
      },
      '::placeholder': {
        color: '#AAAAAA',
      },
    },
    complete: {
      color: '#000000',
    },
    empty: {
      color: '#000000',
    },
    invalid: {
      color: '#DC564A',
      iconColor: '#DC564A',
    },
  },
};

const StripeInput = (props) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  const handleBlur = () => {
    field.onBlur(field.name);
  };

  const onChange = useCallback(handleChange, []);
  const onBlur = useCallback(handleBlur, []);

  return (
    <CardElement
      ref={props.innerRef}
      options={cardStyle}

      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}

      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default StripeInput;
