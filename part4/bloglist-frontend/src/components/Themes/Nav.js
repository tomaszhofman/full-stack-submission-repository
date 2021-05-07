import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.div`
  padding: 20px 30px;
  color: grey;
  background-color: black;
`;

const NavigationLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-right: 15px;
`;

const Nav = ({ children }) => {
  return (
    <div>
      <NavWrapper>
        <NavigationLink to="/users">Users</NavigationLink>
        <NavigationLink to="/">Home</NavigationLink>
      </NavWrapper>
      {children}
    </div>
  );
};

export default Nav;
