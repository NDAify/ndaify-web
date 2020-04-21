import styled from 'styled-components';
import { ErrorMessage as FormikErrorMessage } from 'formik';

const FieldErrorMessage = styled(FormikErrorMessage)`
  color: #edd9a3;
  font-weight: 200;
  padding: 8px;
  border: 1px solid #edd9a3;
  border-radius: 10px;
  display: flex;
`;

export default FieldErrorMessage;
