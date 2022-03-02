import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled.div`
    height: 100px;
    background-color: black;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
`;

export const Logo = styled.div``;

export const Links = styled.div`
    margin-right: 20px;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-family: 'Comfortaa', cursive;
    font-size: 24px;
    margin-left: 10px;
    padding: 15px;
    border: 2px solid black;

    &:hover{
        border: 2px solid white;
        transition: 0.2s;
        border-radius: 20px;
    }
`;


