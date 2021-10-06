import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  console.log(user, isAuthenticated, isLoading);

  if (isLoading) {
    return <div></div>;
  }

  const { given_name, picture } = user;

  return (
    isAuthenticated && (
      <Wrapper>
        <Header>
          <H2>
            Hello, <br />{" "}
            <span style={{ fontStyle: "italic" }}>{given_name}</span>
            <Underline />
          </H2>
          <Avatar src={picture} alt={given_name} />
        </Header>
        <Body>
          <Section>
            <SectionHeading>
              <Icon />
              <SectionTitle>
                <span>Title</span>
                <span style={{ fontSize: "12px", color: "lightgrey" }}>
                  Subtitle
                </span>
              </SectionTitle>
            </SectionHeading>
          </Section>
          <Section>
            <SectionHeading>
              <Icon></Icon>
              <SectionTitle>
                <span>Title</span>
                <span style={{ fontSize: "12px", color: "lightgrey" }}>
                  Subtitle
                </span>
              </SectionTitle>
            </SectionHeading>
          </Section>
        </Body>
        <LogOutButton onClick={logout}>Log Out</LogOutButton>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  margin: var(--margin-page);
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 40px;
  color: var(--color-text);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Body = styled(Header)`
  justify-content: center;
  flex-wrap: wrap;
  max-width: 340px;
  row-gap: 10px;
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

const LogOutButton = styled.button`
  font-size: 15px;
  width: 90%;
  height: 40px;
  max-height: 40px;
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
  margin-top: -10px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionHeading = styled.div`
  display: flex;
  column-gap: 10px;
`;

const Icon = styled.div`
  width: 50px;
  aspect-ratio: 1/1;
  background-color: tomato;
  border-radius: 10px;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
`;

export default Profile;
