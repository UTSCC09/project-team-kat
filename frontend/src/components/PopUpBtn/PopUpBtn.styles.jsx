import styled from 'styled-components';

export const Btn = styled.button`
    margin-top: 50px;
    background-color: white;
    font-family: inherit;
    font-size: 18px;
    padding: 15px;
    border: 1px solid black;
    border-radius: 78px;
    transition: all 0.2s;

    &:hover{
        cursor: pointer;
        background-color: black;
        color: white;
    }

    &:not(:last-child){
        margin-right: 10px;
    }
`;
