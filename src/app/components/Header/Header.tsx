'use client';

import Image from 'next/image';
import styled from 'styled-components';

const StyledHeader = styled('header')`
  padding: 16px 16px;
  border-bottom: 1px solid #e7e9ef;
  background-color: #fff;
`;

export function Header() {
  return (
    <StyledHeader>
      <a href="/">
        <Image src="/abc_health_system.svg" alt="ABC Health System Logo" width={153} height={38} priority />
      </a>
    </StyledHeader>
  );
}
