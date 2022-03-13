import React from 'react';
import {Container, Logo, Links, NavLink} from './Navbar.styles';
import {connect} from 'react-redux';
import {removeOldUser} from '../../utils/AuthToken';

function Navbar({auth: {isAuthenticated}, dispatch}) {
  const handleSignOut = (e) => {
    e.preventDefault();
    removeOldUser(dispatch);
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
