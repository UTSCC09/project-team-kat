import styled from 'styled-components';

export const Transaction = styled.div`
width: 100%;
&:hover{
    cursor: pointer;
}
`;

export const TransactionLogger = styled.div`
    font-family: inherit;
    font-size: 18px;
    margin-top: 15px;
    color: white;
`;

export const TransactionCost = styled.div`
    font-family: inherit;
    font-size: 28px;
    color: white;
`;

export const CostOptions = styled.div`
    width: 100px;
    position: absolute;
    right: 0;
    top: 100%;
    background-color: white;
    border-radius:  5px;
    margin-top: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: left;
    z-index: 10;
`;

export const PayCostOption = styled.button`
    background-color: white;
    color: black;
    font-family: inherit;
    font-size: 14px;
    padding: 10px;
    transition: all 0.2s;
    border: none;

    &:hover{
        background-color: gray;
        color: white;
        cursor: pointer;
    }
`;

export const CostContainer = styled.div`
background-color: black;
flex-basis: 33.3333;
min-width: 400px;
margin-bottom: 1%;
padding: 20px;
display: flex;
flex-direction: column;
border-radius: 20px;
position: relative;
`;
