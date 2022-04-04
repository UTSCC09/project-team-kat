import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import LoginPic from '../../images/login.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, BtnContainer, AuthBtn, AuthPicture, ErrorContainer, InputContainer,
  InputError, AuthPictureText} from './Auth.styles';
import {connect} from 'react-redux';
import {setNewUser} from '../../utils/AuthToken';
import {validateEmail, validatePassword} from '../../utils/validateCredentials';
import authAPI from '../../api/auth.api';


function Login({dispatch}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData) => {
    setIsLoading(true);
    setLoginError('');

    authAPI.login(userData).then((res) => {
      if (res.data.errors) {
        setLoginError(res.data.errors[0].message);
        setIsLoading(false);
        return;
      }
      setNewUser(res.data.data.login.jwt, dispatch);
      navigate('/');
    }).catch((_error) => {
      setLoginError('Connection error');
      setIsLoading(false);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passErr);
    if (!(emailErr || passErr)) {
      login({email: email, password: password});
    }
  };

  const handleInput = (setInput, setInputError, value) => {
    setLoginError('');
    setInputError('');
    setInput(value);
  };

  return (
    <div>
      <AuthWrapper>
        <AuthContainer>
          <AuthInfo>
            <AuthCred>
              <Label>Email</Label>
              <InputContainer>
                <Input error={emailError || loginError}
                  onChange={(e) => {
                    handleInput(setEmail, setEmailError, e.target.value);
                  }}></Input>
                {emailError ? <InputError>{emailError}</InputError> : null}
              </InputContainer>
              <Label>Password</Label>
              <InputContainer>
                <Input error={passwordError || loginError}
                  onChange={(e) => {
                    handleInput(setPassword, setPasswordError, e.target.value);
                  }}
                  type="password">
                </Input>
                {passwordError ?
                <InputError>{passwordError}</InputError> : null}
              </InputContainer>
              <ErrorContainer>
                {loginError ? loginError : null}
              </ErrorContainer>
            </AuthCred>
            <BtnContainer>
              <AuthBtn onClick={handleLogin}>Login</AuthBtn>
            </BtnContainer>
          </AuthInfo>
          <AuthPicture>
            <AuthPictureText>Welcome Back!</AuthPictureText>
            <div>
              <img src={LoginPic} />
            </div>
          </AuthPicture>
        </AuthContainer>
      </AuthWrapper>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(Login);
