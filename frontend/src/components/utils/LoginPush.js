import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { StyledLoaderIcon } from "./StyledIcons";

const LoginPush = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();

  // CHECK IF USER IS LOGGED IN, IF NOT PUSH TO "/login"
  if (!isLoading && !isAuthenticated) {
    history.push("/login");
  }

  // DISPLAY LOADING ICON IF LOGIN DATA IS STILL LOADING
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
