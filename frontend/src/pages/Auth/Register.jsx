import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import RegisterPic from '../../images/register.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, RegisterBtnContainer, AuthBtn, AuthPicture, ErrorContainer,
  AuthPictureText} from './Auth.styles';
import {connect} from 'react-redux';
import {register} from '../../redux/auth/auth.actions';

function Register({register}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const fieldErr = error ? error.type : null;
  const missingFieldErr = fieldErr === 'MISSING_FIELD';
  const usernameErr = fieldErr === 'INVALID_USERNAME' || missingFieldErr;
  const emailErr = fieldErr === 'INVALID_EMAIL' || missingFieldErr;
  const passwordErr = fieldErr === 'INVALID_PASSWORD' || missingFieldErr;

  const handleRegister = () => {
    register({email: email, username: username, password: password}, setError,
        navigate);
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
              <Input error = {usernameErr}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}></Input>
              <Label>Email</Label>
              <Input error = {emailErr}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}></Input>
              <Label>Password</Label>
              <Input error = {passwordErr}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                type="password">
              </Input>
              <ErrorContainer>{error ? error.message : null}</ErrorContainer>
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

export default connect(null, {register})(Register);
