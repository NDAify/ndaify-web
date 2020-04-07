import React, { useCallback } from 'react';
import styled from 'styled-components';
import ContentEditable from 'react-sane-contenteditable';
import { useField } from 'formik';

const StyledSpan = styled(ContentEditable)`
  font-weight: 700;
  padding: 4px;
  outline: 1px dashed #edd9a3;
  color: #ffffff;
`;

const ContentEditableInput = (props) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (e, value) => {
    helpers.setValue(value);
  };

  const handleBlur = () => {
    field.onBlur(field.name);
  };

  // console.log('props',props)
  // console.log('field',field)
  // console.log('meta',meta)
  // console.log('helpers',helpers)

  const onChange = useCallback(handleChange, []);
  const onBlur = useCallback(handleBlur, []);

  return (
    <StyledSpan
      ref={props.innerRef}

      tagName="span"
      content={meta.value}
      editable
      maxLength={120}
      multiLine={false}

      {...props}
      {...field}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default ContentEditableInput;


// onBlur={(e) => {
//   e.target.name = 'sender';
//   onBlur(e);
// }}
