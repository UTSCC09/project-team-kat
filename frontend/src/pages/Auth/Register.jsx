import React from 'react';
import RegisterPic from '../../images/register.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, RegisterBtnContainer, AuthBtn, AuthPicture,
  AuthPictureText} from './Auth.styles';

function Register() {
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
              <Label>Name</Label>
              <Input></Input>
              <Label>Email</Label>
              <Input></Input>
              <Label>Password</Label>
              <Input></Input>
            </AuthCred>
            <RegisterBtnContainer>
              <AuthBtn>Register</AuthBtn>
            </RegisterBtnContainer>
          </AuthInfo>
        </AuthContainer>
      </AuthWrapper>
    </div>
  );
}

export default Register;
