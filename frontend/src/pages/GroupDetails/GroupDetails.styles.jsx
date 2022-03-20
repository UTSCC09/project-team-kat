import styled from 'styled-components';

export const GroupsContainer = styled.div`
margin-top: 40px;
display: flex;
width: 100%;
justify-content: start;
flex-wrap: wrap;
gap: 15px;
`;

export const Transaction = styled.div`
background-color: black;
flex-basis: 33.3333;
min-width: 400px;
margin-bottom: 1%;
padding: 20px;
display: flex;
flex-direction: column;
border-radius: 20px;
overflow: hidden;
`;

export const PopupInputLabel = styled.div`
    margin-top: 25px;

`;

export const TransactionCost = styled.div`
    font-family: inherit;
    font-size: 28px;
    color: white;
`;

export const TransactionLogger = styled.div`
    font-family: inherit;
    font-size: 18px;
    margin-top: 15px;
    color: white;
`;

export const GroupMembersContainer = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
margin-top: 25px;
`;

export const GroupMember = styled.div`
background-color: transparent;
font-family: inherit;    
font-size: 24px;
padding: 15px;
border: 2px solid white;
border-radius: 78px;
color: white;
`;

export const Tag = styled.div`
background-color: transparent;
font-family: inherit;    
font-size: 18px;
padding: 10px;
border: 2px solid white;
border-radius: 78px;
color: white;
`;
