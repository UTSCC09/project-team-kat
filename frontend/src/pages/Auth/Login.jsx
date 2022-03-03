import React from 'react';
import LoginPic from '../../images/login.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, BtnContainer, AuthBtn, AuthPicture,
  AuthPictureText} from './Auth.styles';
import {connect} from 'react-redux';
import {setMessage} from '../../redux/test/test.actions';

function Login({setMessage}) {
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
              <AuthBtn onClick={() => setMessage(Math.random())}>Login</AuthBtn>
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
  setMessage: (message) => dispatch(setMessage(message)),
});

export default connect(null, mapDispatchToProps)(Login);
