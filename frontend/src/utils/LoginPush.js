import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { StyledLoaderIcon } from "../components/StyledIcons";

const LoginPush = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();

  if (!isLoading && !isAuthenticated) {
    history.push("/login");
  }

  if (isLoading) {
    return (
      <Wrapper>
        <StyledLoaderIcon />
      </Wrapper>
    );
  }

  return <></>;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: var(--color-background);
  z-index: 100;
  display: flex; 
  justify-content: center;
  align-items: center;
`;

export default LoginPush;
