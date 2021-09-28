// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";

// IMPORT COMPONENTS
import {
  StyledHomeIcon,
  StyledSearchIcon,
  StyledBookMarkIcon,
  StyledProfileIcon,
} from "../StyledIcons";

const NavBar = () => {
  return (
    <Wrapper>
      <StyledHomeIcon />
      <StyledSearchIcon />
      <StyledBookMarkIcon />
      <StyledProfileIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 3vw;
  width: 90vw;
  height: 15vw;
  max-height: 70px;
  border-radius: 20px;
  background-color: var(--color-midground);
  display: flex;
  justify-content: space-around;
  color: var(--color-text);
  align-items: center;
`;

export default NavBar;
