import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bg, bPad, bRad, color }) {
  return (
    <ButtonStyled
      onClick={onClick}
      style={{ background: bg, padding: bPad, borderRadius: bRad, color }}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.85;
  }
`;

export default Button;
