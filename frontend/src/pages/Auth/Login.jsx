import React from 'react';
import LoginPic from '../../images/login.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, BtnContainer, AuthBtn, AuthPicture,
  AuthPictureText} from './Auth.styles';

function Login() {
  return (
    <div>
      <AuthWrapper>
        <AuthContainer>
          <AuthInfo>
            <AuthCred>
              <Label>Username</Label>
              <Input></Input>
              <Label>Password</Label>
              <Input></Input>
            </AuthCred>
            <BtnContainer>
              <AuthBtn>Login</AuthBtn>
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

export default Login;
