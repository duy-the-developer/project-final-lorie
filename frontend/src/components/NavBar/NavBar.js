// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// IMPORT COMPONENTS
import {
  StyledHomeIcon,
  StyledSearchIcon,
  StyledBookMarkIcon,
  StyledProfileIcon,
} from "../utils/StyledIcons";

const NavBar = () => {
  return (
    <Wrapper>
      <StyledNavLink to="/" activeClassName="current" exact>
        <StyledHomeIcon />
      </StyledNavLink>
      <StyledNavLink to="/search" activeClassName="current">
        <StyledSearchIcon />
      </StyledNavLink>
      <StyledNavLink to="/bookmark" activeClassName="current" exact>
        <StyledBookMarkIcon />
      </StyledNavLink>
      <StyledNavLink to="/profile" activeClassName="current">
        <StyledProfileIcon />
      </StyledNavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0vw;
  width: 90vw;
  height: 15vw;
  max-height: 70px;
  border-radius: 20px 20px 0 0;
  background-color: var(--color-background);
  display: flex;
  justify-content: space-around;
  color: var(--color-text);
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  /* padding: 2px; */
  /* border-bottom: 5px solid rgb(0, 0, 0, 0); */

  &.current {
    color: var(--color-underline2);
    border-bottom: 5px solid var(--color-underline2);
  }
`;

export default NavBar;
