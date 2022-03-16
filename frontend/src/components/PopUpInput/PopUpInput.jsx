import React from 'react';

import {InputContainer, Input,
  InputError} from './PopUpInput.styles';

function PopUpInput({error, handleChange}) {
  return (
    <InputContainer>
      <Input error={error}
        onChange={handleChange}>
      </Input>
      {
        error ?
        <InputError>
          {error}
        </InputError> :
        null
      }
    </InputContainer>
  );
}

export default PopUpInput;
