import styled from 'styled-components';

export const PageContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.65);
    z-index: 1;
`;

export const Content = styled.div`
    max-width: 700px;
    background-color: white;
    margin: 280px auto;
    padding: 100px 60px;
    border-radius: 10px;
`;
