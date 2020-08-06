import React from 'react';
import styled from 'styled-components';

const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 80px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #2E2408;
  font-family: Lucida Sans Unicode, Lucida Grande, sans-serif;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
`;

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;