import styled from 'styled-components';

export const GroupsContainer = styled.div`
margin-top: 40px;
display: flex;
width: 100%;
justify-content: space-around;
flex-wrap: wrap;
`;

export const Transaction = styled.div`
background-color: black;
width: 32.5%;
min-width: 400px;
margin-bottom: 1%;
padding: 40px;
display: flex;
flex-direction: column;
border-radius: 20px;
overflow: hidden;
`;

export const PopupInputLabel = styled.div`
    margin-top: 25px;

`

export const TransactionCost = styled.div`
    font-family: inherit;
    font-size: 36px;
    color: white;
`;

export const TransactionLogger = styled.div`
    font-family: inherit;
    font-size: 24px;
    margin-top: 15px;
    margin-left: 20px;
    color: white;
`;

export const TagHeader = styled.div`
    font-family: inherit;
    font-size: 24px;
    color: white;
    margin-right: 25px;
`

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
`