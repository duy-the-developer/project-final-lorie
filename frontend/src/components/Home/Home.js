import React from "react";
import styled from "styled-components";

import Header from "../Header/Header";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      Home
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  color: var(--color-text);
`;
