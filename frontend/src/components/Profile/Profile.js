import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import {
  StyledProfileIcon,
  StyledSliderIcon,
  StyledMailIcon,
  StyledForwardIcon,
} from "../utils/StyledIcons";

import { UserContext } from "../ContextProviders/UserContext";
import { useHistory } from "react-router";

import { capitalizeFirstLetter } from "../utils/utils";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const history = useHistory();

  const {
    state: {
      isLoaded,
      userContextData: {
        _id,
        email,
        family_name,
        settings: {
          targetDailyCalories,
          dietType,
          intolerances,
          marcroNutrients: {
            proteinPercentage,
            fatPercentage,
            carbsPercentage,
          },
        },
      },
    },
    action: { getUserInfo },
  } = useContext(UserContext);

  if (isLoading) {
    return <div></div>;
  }

  const { given_name, picture, nickname } = user;

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
              <Icon>
                <StyledProfileIcon />
              </Icon>
              <SectionTitle>
                <span>Account</span>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Edit and manage your account details
                </span>
              </SectionTitle>
            </SectionHeading>

            <SectionBody>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Nickname
                </span>
                <span>{nickname}</span>
              </MenuItem>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>Email</span>
                <span>{email}</span>
              </MenuItem>
            </SectionBody>
          </Section>

          <Section>
            <SectionHeading>
              <Icon>
                <StyledSliderIcon />
              </Icon>
              <SectionTitle
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <SectionTitle style={{ width: "100%" }}>
                  <span>Profile settings</span>
                  <span style={{ fontSize: "12px", color: "grey" }}>
                    Nutritional and dietary preferrences
                  </span>
                </SectionTitle>
                <Icon
                  style={{ background: "transparent", width: "30px" }}
                  onClick={(e) => {
                    history.push("/profile/setup");
                  }}
                >
                  <StyledForwardIcon />
                </Icon>
              </SectionTitle>
            </SectionHeading>
            <SectionBody>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Target daily calories
                </span>
                <span>{targetDailyCalories} kCal</span>
              </MenuItem>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Target daily protein
                </span>
                <span>{proteinPercentage} %</span>
              </MenuItem>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Target daily carbs
                </span>
                <span>{carbsPercentage} %</span>
              </MenuItem>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Target daily fat
                </span>
                <span>{fatPercentage} %</span>
              </MenuItem>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Diet preference
                </span>
                <span>{capitalizeFirstLetter(dietType)}</span>
              </MenuItem>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Intolerances
                </span>
                <span>{capitalizeFirstLetter(intolerances)}</span>
              </MenuItem>
            </SectionBody>
          </Section>

          <Section>
            <SectionHeading>
              <Icon>
                <StyledMailIcon />
              </Icon>
              <SectionTitle>
                <span>Help and Feedback</span>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Reach us with your feedback and questions
                </span>
              </SectionTitle>
            </SectionHeading>

            <SectionBody>
              <MenuItem>
                <span>FAQ {`&`} Guides</span>
              </MenuItem>
              <MenuItem>
                <span>Contact Us</span>
              </MenuItem>
            </SectionBody>
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
  padding-bottom: 70px;
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
  row-gap: 20px;
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
  row-gap: 10px;
`;

const SectionHeading = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

const Icon = styled.div`
  width: 45px;
  aspect-ratio: 1/1;
  background-color: var(--color-underline2);
  border-radius: 10px;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const SectionBody = styled.div`
  padding: 15px 15px;
  background: var(--color-midground);
  border-radius: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 3px;
  border-bottom: 1px solid grey;
  padding: 10px 0;
  min-height: 40px;

  &:nth-child(1) {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
`;

export default Profile;
