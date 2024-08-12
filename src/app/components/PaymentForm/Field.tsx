import { ErrorMessage, FieldConfig, useField } from 'formik';
import React from 'react';
import styled from 'styled-components';

import { CheckIcon, ErrorIcon } from '../../icons';

const StyledErrorMessage = styled('span')`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #c34648;
  margin-top: 4px;
`;

const StyledInput = styled('input')<{ $hasError?: boolean }>`
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.$hasError ? '#C34648' : '#6d7088')};
  border-radius: 8px;
  padding: 12px 16px;
  color: #171731;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
`;

const StyledLabel = styled('label')`
  font-weight: 700;
  line-height: 20px;
  color: #65657b;
`;

const StyledInputWrapper = styled('div')`
  position: relative;
  margin-top: 4px;
`;

const StyledSpan = styled('span')`
  position: absolute;
  right: 16px;
  display: inline-flex;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0px;
`;

interface InputFieldProps {
  label?: string;
}

export const InputField: React.FC<InputFieldProps & FieldConfig<string> & JSX.IntrinsicElements['input']> = ({
  label,
  ...props
}) => {
  const { name } = props;
  const [field, meta] = useField(props);

  const showErrorIcon = meta.error && meta.touched;
  const showCheckIcon = !meta.error && meta.touched;

  return (
    <div className="flex flex-col grow">
      <StyledLabel className="text-sm max-sm:text-xs" htmlFor={name}>
        {label}
        <StyledInputWrapper>
          <StyledInput $hasError={Boolean(meta.error && meta.touched)} {...field} {...props} />
          {showErrorIcon && (
            <StyledSpan data-testid="error-icon">
              <ErrorIcon />
            </StyledSpan>
          )}
          {showCheckIcon && (
            <StyledSpan data-testid="check-icon">
              <CheckIcon />
            </StyledSpan>
          )}
        </StyledInputWrapper>
      </StyledLabel>
      <StyledErrorMessage>
        <ErrorMessage name={name} />
      </StyledErrorMessage>
    </div>
  );
};
