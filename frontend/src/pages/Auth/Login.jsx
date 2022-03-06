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
  const [error, setError] = useState({});

  const missingFieldErr = error.type === 'MISSING_FIELD';
  const emailErr = error.type === 'INVALID_EMAIL';
  const passwordErr = error.type === 'INVALID_PASSWORD';

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
              <Input error={emailErr || missingFieldErr}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError({});
                }}></Input>
              <Label>Password</Label>
              <Input error={passwordErr || missingFieldErr}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError({});
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
