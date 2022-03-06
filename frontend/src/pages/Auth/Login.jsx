import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import LoginPic from '../../images/login.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, BtnContainer, AuthBtn, AuthPicture, ErrorContainer,
  AuthPictureText} from './Auth.styles';
import {connect} from 'react-redux';
import {login} from '../../redux/auth/auth.actions';

function Login({login}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const fieldErr = error ? error.type : null;
  const missingFieldErr = fieldErr === 'MISSING_FIELD';
  const emailErr = fieldErr === 'INVALID_EMAIL' || missingFieldErr;
  const passwordErr = fieldErr === 'INVALID_PASSWORD' || missingFieldErr;

  const handleLogin = (e) => {
    e.preventDefault();

    login({email: email, password: password}, setError, navigate);
  };

  return (
    <div>
      <AuthWrapper>
        <AuthContainer>
          <AuthInfo>
            <AuthCred>
              <Label>Email</Label>
              <Input error={emailErr}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}></Input>
              <Label>Password</Label>
              <Input error={passwordErr}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                type="password">
              </Input>
              <ErrorContainer>{error ? error.message : null}</ErrorContainer>
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


export default connect(null, {login})(Login);
