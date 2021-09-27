import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return <Wrapper>NavBar</Wrapper>;
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 5vw;
  width: 90vw;
  border-radius: 5px;
  background-color: var(--color-midground);
`;

export default NavBar;
