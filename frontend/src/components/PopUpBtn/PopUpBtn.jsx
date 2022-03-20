import React from 'react';
import {Btn} from './PopUpBtn.styles';

function PopUpBtn({handleClick, children, disabled}) {
  return (
    <Btn onClick={handleClick} disabled={disabled}>
      {children}
    </Btn>
  );
}

export default PopUpBtn;
