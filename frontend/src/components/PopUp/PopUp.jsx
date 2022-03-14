import React from 'react';

import {StyledModal, PopupContainer, Backdrop} from './PopUp.styles';

function PopUp({open, handleClose, children}) {
  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}>
      <PopupContainer>
        {children}
      </PopupContainer>
    </StyledModal>
  );
}

export default PopUp;
