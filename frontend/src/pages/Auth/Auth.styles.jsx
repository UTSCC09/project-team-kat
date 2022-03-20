import styled from 'styled-components';

export const AuthWrapper = styled.div`
    height: 100vh;
    background-color: #2F2F2F;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AuthInfo = styled.div`
    min-width: 100%;
    max-width: 620px;
    height: 720px;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const AuthCred = styled.div`
    margin-left: 15px;
    max-width: 600px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
`;

export const Label = styled.div`
    font-family: "Comfortaa", cursive;
    font-size: 30px;
    margin-bottom: 20px;
    color: white;
`;

export const InputContainer = styled.div`
    position: relative;
`;

export const InputError = styled.div`
    position: absolute;
    bottom: 20px;
    color: red;
`;

export const Input = styled.input`
    max-width: 700px;
    width: 100%;
    border: none;
    border-bottom: 2px solid ${(props) => props.error ? 'red' : 'white'};
    outline: none;
    background-color: black;
    font-family: "Comfortaa", cursive;
    font-size: 30px;
    margin-bottom: 50px;
    color: ${(props) => props.error ? 'red' : 'white'};
`;

export const BtnContainer = styled.div`
    margin-top: 155px;
    display: flex;
    justify-content: center;
`;

export const AuthBtn = styled.button`
    max-width: 300px;
    width: 100%;
    background-color: black;
    font-family: "Comfortaa", cursive;
    color: white;
    margin: auto;
    font-size: 30px;
    padding: 20px;
    border: 2px solid white;
    border-radius: 40px;

    transition: 0.2s;
    cursor: pointer;
`;

export const AuthPicture = styled.div`
    min-width: 100%;
    max-width: 620px;
    height: 720px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AuthPictureText = styled.div`
    font-family: "Comfortaa", cursive;
    font-size: 36px;
    margin-bottom: 105px;
`;

export const RegisterBtnContainer = styled.div`
    margin-top: 105px;
    display: flex;
    justify-content: center;
`;

export const ErrorContainer = styled.div`
    position: absolute;
    bottom: 20px;
    color: red;
`;
