import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Accent } from '../styled/Misc';
import {
  StyledLink,
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems
} from '../styled/Navbar';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <StyledNavbar>
      <StyledNavBrand>
        <StyledLink to='/'>
          Learn.Build.<Accent>Type.</Accent>
        </StyledLink>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to='/'>Home</StyledLink>
        </li>
        <li>
          <StyledLink to='/high-scores'>High Scores</StyledLink>
        </li>
        <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
      </StyledNavItems>
    </StyledNavbar>
  );
}
