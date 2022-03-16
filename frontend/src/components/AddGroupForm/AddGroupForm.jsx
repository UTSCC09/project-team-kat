import React from 'react';
import PopUpInput from '../PopUpInput/PopUpInput';
import PopUpBtn from '../PopUpBtn/PopUpBtn';

function AddGroupForm({header, inputError, handleInputChange,
  handleBtnClick, btnText}) {
  return (
    <>
      <div>{header}</div>
      <PopUpInput
        error={inputError}
        handleChange={handleInputChange}
      />
      <PopUpBtn handleClick={handleBtnClick}>
        {btnText}
      </PopUpBtn>
    </>
  );
}

export default AddGroupForm;
