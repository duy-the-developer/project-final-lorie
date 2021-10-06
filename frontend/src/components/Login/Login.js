import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <BackgroundBlurr>
        <StyledH1>
          Meet{" "}
          <span
            style={{
              fontStyle: "italic",
              fontSize: "50px",
            }}
          >
            Lorie
            <Underline />
          </span>
        </StyledH1>
        <Subtitle>Your personal meal planning assistant</Subtitle>
      </BackgroundBlurr>
      <StyledImage
        src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1310&q=80"
        alt="eggs and toast"
      ></StyledImage>
      <StyledLogin onClick={() => loginWithRedirect()}>Get Started</StyledLogin>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-text);
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  z-index: 1;
  bottom: 100px;
`;

const BackgroundBlurr = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(143, 143, 143, 0) 30%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 1) 100%
  );

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5%;
`;

const StyledH1 = styled.h1`
  padding: 10px 0;
  font-size: 40px;
  display: flex;
  column-gap: 10px;
  align-items: baseline;
`;

const Subtitle = styled.p`
  color: var(--color-highlight);
`;

const StyledLogin = styled.button`
  position: fixed;
  z-index: 3;
  bottom: 100px;
  font-size: 15px;
  width: 90%;
  max-width: 375px;
  height: 7%;
  max-height: 75px;
  background-color: var(--color-underline2);
  color: var(--color-text);
  border: none;
  box-sizing: border-box;
  border-radius: 20px;

  &:active {
    opacity: 0.5;
  }
`;

const Underline = styled.div`
  margin-top: -13px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

export default Login;

// image credit to Joseph Gonzalez on Unsplash
