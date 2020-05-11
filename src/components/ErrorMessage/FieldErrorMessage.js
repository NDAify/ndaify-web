import styled from 'styled-components';
import { ErrorMessage as FormikErrorMessage } from 'formik';

const FieldErrorMessage = styled(FormikErrorMessage)`
  color: var(--ndaify-accents-warning);
  font-weight: 200;
  padding: 8px;
  border: 1px solid var(--ndaify-accents-warning);
  border-radius: var(--ndaify-accents-radius-2);
  display: flex;
`;

export default FieldErrorMessage;
