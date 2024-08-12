import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledButton = styled('button')`
  width: 100%;
  background-color: #3667e9;
  color: #fff;
  padding: 12px 40px;
  border-radius: 12px;
`;

export const Button = React.forwardRef(
  (props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>, ref: React.Ref<HTMLButtonElement>) => {
    return (
      <StyledButton ref={ref} {...props}>
        {props.children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
