import React from 'react';
import {Btn} from './AddItemBtn.styles';

function AddItemBtn({handleOnClick, text}) {
  return (
    <Btn onClick={handleOnClick}>
      {text}
    </Btn>
  );
}

export default AddItemBtn;
