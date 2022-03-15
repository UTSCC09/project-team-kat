import styled from 'styled-components';
import ModalUnstyled from '@mui/base/ModalUnstyled';

export const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupContainer = styled.div`
    display: flex;
    font-family: "Comfortaa", cursive;
    flex-direction: column;
    font-size: 22px;
    text-align: center;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    padding: 50px;
    max-width: 650px;
    flex: 1;
`;


export const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
`;
