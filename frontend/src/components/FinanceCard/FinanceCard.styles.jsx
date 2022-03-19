import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 33.3333;
  
  min-width: 400px;
  margin-bottom: 1%;
  padding: 20px;

  background-color: black;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
`;

export const AmountOwingContainer = styled.div`
  display: flex;
  flex-direction: row;

  font-family: inherit;
  font-size: 18px;
  color: white;
`;

export const AmountText = styled.div`
  font-family: inherit;
  margin-top: 15px;
  margin-right: 10px;
`;

export const AmountValue = styled.div`
  font-family: inherit;
  margin-top: 15px;
`;
