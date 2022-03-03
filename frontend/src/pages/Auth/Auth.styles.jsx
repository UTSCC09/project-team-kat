import styled from 'styled-components';

export const AuthWrapper = styled.div`
    min-height: calc(100vh - 100px);
    background-color: #2F2F2F;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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
`;

export const Label = styled.div`
    font-family: "Comfortaa", cursive;
    color: white;
    font-size: 30px;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    max-width: 700px;
    width: 100%;
    border: none;
    border-bottom: 2px solid white;
    outline: none;
    background-color: black;
    font-family: "Comfortaa", cursive;
    color: white;
    font-size: 30px;
    margin-bottom: 50px;
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
