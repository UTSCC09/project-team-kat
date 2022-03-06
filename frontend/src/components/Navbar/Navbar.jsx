import React from 'react';
import {useNavigate} from 'react-router';
import {Container, Logo, Links, NavLink} from './Navbar.styles';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth/auth.actions';

function Navbar({auth: {isAuthenticated}, logout}) {
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    logout(navigate);
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

export default connect(mapStateToProps, {logout})(Navbar);
