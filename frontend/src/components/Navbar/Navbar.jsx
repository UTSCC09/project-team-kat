import React from 'react';
import {Container, Logo, Links, NavLink} from './Navbar.styles';
import {connect} from 'react-redux';
import {removeOldUser} from '../../utils/AuthToken';
import {useNavigate} from 'react-router';

function Navbar({auth: {isAuthenticated}, dispatch}) {
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    removeOldUser(dispatch);
    navigate('/login');
  };

  return (
    <Container>
      <Logo></Logo>
      <Links>
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {!isAuthenticated && <NavLink to="/register">Sign Up</NavLink>}
        {isAuthenticated &&
          <NavLink onClick={handleSignOut} to="/login">Sign Out</NavLink>}
      </Links>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProsp = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProsp)(Navbar);
