import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import LoginPic from '../../images/login.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, BtnContainer, AuthBtn, AuthPicture,
  AuthPictureText} from './Auth.styles';
import {connect} from 'react-redux';
import {login} from '../../redux/auth/auth.actions';

function Login({auth, login}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    login({email: email, password: password}, navigate);
  };

  return (
    <div>
      <AuthWrapper>
        <AuthContainer>
          <AuthInfo>
            <AuthCred>
              <Label>Email</Label>
              <Input onChange={(e) => setEmail(e.target.value)}></Input>
              <Label>Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password">
              </Input>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {login})(Login);
