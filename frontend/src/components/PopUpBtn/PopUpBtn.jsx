import React from 'react';
import {Btn} from './PopUpBtn.styles';

function PopUpBtn({handleClick, children}) {
  return (
    <Btn onClick={handleClick}>
      {children}
    </Btn>
  );
}

export default PopUpBtn;
