import React from 'react';
import { Link } from 'react-router-dom';
import { Accent } from '../styled/Misc';
import {
  StyledLink,
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems
} from '../styled/Navbar';

export default function Navbar() {
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
          <StyledLink to='/'>High Scores</StyledLink>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  );
}
