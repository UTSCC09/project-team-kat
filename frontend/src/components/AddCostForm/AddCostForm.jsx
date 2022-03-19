import React, {useState} from 'react';
import PopUpInput from '../PopUpInput/PopUpInput';
import PopUpBtn from '../PopUpBtn/PopUpBtn';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {InputError, InputContainer} from '../PopUpInput/PopUpInput.styles';

function AddCostForm({users, inputError, handleNameChange,
  handleAmountChange, handleUsersChange, handleBtnClick, btnText}) {
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    handleUsersChange(event);
    setPersonName(value);
  };

  return (
    <>
      {users.length == 0 &&
        <div style={{fontSize: '16px', color: 'red', marginTop: '20px'}}>
          Cannot create a new cost without having other users in your group!
        </div>}
      {users.length != 0 &&
      <>
        <div>Please enter the cost title</div>
        <PopUpInput
          handleChange={handleNameChange}
        />
        <div style={{'marginTop': '30px'}}>Please enter the cost amount</div>
        <PopUpInput
          handleChange={handleAmountChange}
        />
        <div style={{'marginTop': '30px'}}>Select all applicable users</div>
        <FormControl style={{margin: '30px', width: 300}}>
          <InputLabel>Tag</InputLabel>
          <Select
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) =>
              selected.map((user) => user.username).join(', ')}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user}>
                <Checkbox checked={personName.indexOf(user) > -1} />
                <ListItemText primary={user.username} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputContainer>
          {inputError && <InputError>
            {inputError}
          </InputError>}
        </InputContainer>
        <PopUpBtn handleClick={handleBtnClick}>
          {btnText}
        </PopUpBtn>
      </>
      }
    </>
  );
}

export default AddCostForm;
