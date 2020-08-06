import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 50px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 80px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#FFFFFF')};
  background: #2E2408;
  font-family: Lucida Sans Unicode, Lucida Grande, sans-serif;;
  font-size: 1.0rem;
`;