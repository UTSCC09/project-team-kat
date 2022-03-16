import styled from 'styled-components';

export const InputContainer = styled.div`
    width: 100%;
    position: relative;
`;

export const Input = styled.input`
    max-width: 700px;
    width: 80%;
    border: none;
    border-bottom: 2px solid ${(props) => props.error ? 'red' : 'black'};
    outline: none;
    background-color: white;
    font-family: "Comfortaa", cursive;
    font-size: 30px;
    margin-top: 30px;
    color: ${(props) => props.error ? 'red' : 'black'};
`;

export const InputError = styled.div`
     position: absolute;
     text-align: center;
     color: red;
     bottom: -30px;
     left: 50%;
     transform: translateX(-50%);
     width: 100%;
`;
