import React from 'react';
import {Container, Logo, Links, NavLink} from './Navbar.styles';

function Navbar() {
  return (
    <Container>
      <Logo>

      </Logo>
      <Links>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Sign Up</NavLink>
      </Links>
    </Container>
  );
}

export default Navbar;
