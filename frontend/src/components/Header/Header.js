import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div></div>;
  } else if (isAuthenticated) {
    const { given_name, picture } = user;
    return (
      <HeaderWrapper>
        <H2>
          Hello, <br />{" "}
          <span style={{ fontStyle: "italic" }}>{given_name}</span>
          <Underline />
        </H2>

        <Avatar src={picture} alt={given_name} />
      </HeaderWrapper>
    );
  } else {
    return <></>;
  }
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const H2 = styled.h2`
  text-align: left;
`;

const Avatar = styled.img`
  max-width: 50px;
  border-radius: 10px;
  box-sizing: border-box;
  object-fit: cover;
`;

const Underline = styled.div`
  margin-top: -10px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

export default Header;
