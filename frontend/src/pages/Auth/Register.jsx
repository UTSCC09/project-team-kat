import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import RegisterPic from '../../images/register.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, RegisterBtnContainer, AuthBtn, AuthPicture, ErrorContainer,
  AuthPictureText, InputContainer, InputError} from './Auth.styles';
import {connect} from 'react-redux';
import {REGISTER_MUTATION} from '../../graphql/auth.defs';
import {setNewUser} from '../../utils/AuthToken';
import {validateEmail, validatePassword,
  validateUsername} from '../../utils/validateCredentials';

function Register({dispatch}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = (userData) => {
    setIsLoading(true);
    setRegisterError('');
    axios
        .post('http://localhost:8000',
            {
              query: REGISTER_MUTATION,
              variables: userData,
            },
        )
        .then((res) =>{
          if (res.data.errors) {
            setRegisterError(res.data.errors[0].message);
            setIsLoading(false);
            return;
          }
          setNewUser(res.data.data.register.jwt, dispatch, navigate);
        })
        .catch((error) => {
          console.log(error);
          setRegisterError('Connection error');
          setIsLoading(false);
        });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const userErr = validateUsername(username);
    setEmailError(emailErr);
    setPasswordError(passErr);
    setUsernameError(userErr);
    if (!(emailErr || passErr || userErr)) {
      register({email: email, username: username, password: password});
    }
  };

  const handleInput = (setInput, setInputError, value) => {
    setRegisterError('');
    setInputError('');
    setInput(value);
  };

  return (
    <div>
      <AuthWrapper>
        <AuthContainer>
          <AuthPicture>
            <AuthPictureText>Nice to meet you!</AuthPictureText>
            <div>
              <img src={RegisterPic} />
            </div>
          </AuthPicture>
          <AuthInfo>
            <AuthCred>
              <Label>Username</Label>
              <InputContainer>
                <Input error={usernameError || registerError}
                  onChange={(e) => {
                    handleInput(setUsername, setUsernameError, e.target.value);
                  }}>
                </Input>
                {usernameError ?
                <InputError>{usernameError}</InputError> : null}
              </InputContainer>
              <Label>Email</Label>
              <InputContainer>
                <Input error={emailError || registerError}
                  onChange={(e) => {
                    handleInput(setEmail, setEmailError, e.target.value);
                  }}>
                </Input>
                {emailError ? <InputError>{emailError}</InputError> : null}
              </InputContainer>
              <Label>Password</Label>
              <InputContainer>
                <Input error={passwordError || registerError}
                  onChange={(e) => {
                    handleInput(setPassword, setPasswordError, e.target.value);
                  }}
                  type="password">
                </Input>
                {passwordError ?
                <InputError>{passwordError}</InputError> : null}
              </InputContainer>
              <ErrorContainer>
                {registerError ? registerError : null}
              </ErrorContainer>
            </AuthCred>
            <RegisterBtnContainer>
              <AuthBtn onClick={handleRegister}>Register</AuthBtn>
            </RegisterBtnContainer>
          </AuthInfo>
        </AuthContainer>
      </AuthWrapper>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});


export default connect(null, mapDispatchToProps)(Register);
