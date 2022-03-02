import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const PageContainer = styled.div`
`;

export const Wrapper = styled.div`
    margin: 40px;
`;

export const Heading = styled.div`
    font-size: 36px;
    font-family: "Comfortaa", cursive;
    margin-bottom: 25px;
`;

export const Info = styled.div`
    font-size: 24px;
    font-family: "Comfortaa", cursive;
    margin-bottom: 100px;
`;

export const ImageContaner = styled.div`
    display: flex;
    justify-content: center;
`;

export const Image = styled.img`
    width: 100%;
    max-width: 800px;
`;

export const Button = styled.div`
    margin-top: 45px;
    display: flex;
    justify-content: center;
`;

export const JoinBtn = styled(Link)`
    font-size: 24px;
    font-family: "Comfortaa", cursive;
    margin-bottom: 100px;
    text-decoration: none;
    color: black;
    padding: 30px;
    border: 2px solid black;
    border-radius: 45px;
    margin-top: 25px;
`;
