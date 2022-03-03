import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import RegisterPic from '../../images/register.png';
import {AuthWrapper, AuthContainer, AuthInfo, AuthCred, Label,
  Input, RegisterBtnContainer, AuthBtn, AuthPicture,
  AuthPictureText} from './Auth.styles';
import {connect} from 'react-redux';
import {register} from '../../redux/auth/auth.actions';

function Register({auth, register}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, []);

  const handleRegister = () => {
    register({email: email, username: username, password: password},
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
              <Input onChange={(e) => setUsername(e.target.value)}></Input>
              <Label>Email</Label>
              <Input onChange={(e) => setEmail(e.target.value)}></Input>
              <Label>Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password">
              </Input>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {register})(Register);
