import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {NavItem} from 'react-bootstrap';

export default function NavbarAuth() {
  return (
    <div>
      <LinkContainer to="/auth/twitch/callback">
        <NavItem>Twitch</NavItem>
      </LinkContainer>
      <LinkContainer to="/auth/gplus/callback">
        <NavItem>Youtube</NavItem>
      </LinkContainer>
    </div>
  );
}
