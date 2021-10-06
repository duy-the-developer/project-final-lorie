import React, { useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";

import { StyledSliderIcon } from "../utils/StyledIcons";
import { dietTypes, intoleranceTypes } from "../utils/cuisinesData";

const ProfileSetup = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const [calories, setCalories] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [proteinPercentage, setProteinPercentage] = useState("");
  const [carbsPercentage, setCarbsPercentage] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");

  const history = useHistory();

  const { given_name, picture } = user;

  const handleUpdateUserInfo = () => {
    console.log(
      calories,
      diet,
      intolerances,
      proteinPercentage,
      carbsPercentage,
      fatPercentage
    );
  };

  return (
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
            </SectionTitle>
          </SectionHeading>
          <SectionBody>
            <MenuItem>
              <span style={{ fontSize: "12px", color: "grey" }}>
                Diet preference
              </span>
              <StyledSelect
                id="diet"
                name="diet"
                onChange={(e) => {
                  setDiet(e.target.value);
                }}
              >
                <option value="">Diet type - Pick one (optional)</option>
                {dietTypes.map((diet) => {
                  return (
                    <option key={diet} value={diet.toLowerCase()}>
                      {diet}
                    </option>
                  );
                })}
              </StyledSelect>
            </MenuItem>
            <MenuItem>
              <span style={{ fontSize: "12px", color: "grey" }}>
                Intolerances
              </span>
              <StyledSelect
                id="intolerances"
                name="intolerances"
                onChange={(e) => {
                  setIntolerances(e.target.value);
                }}
              >
                <option value="">Intolerances - Pick one (optional)</option>
                {intoleranceTypes.map((intolerance) => {
                  return (
                    <option key={intolerance} value={intolerance.toLowerCase()}>
                      {intolerance}
                    </option>
                  );
                })}
              </StyledSelect>
            </MenuItem>
            <MenuItem>
              <span style={{ fontSize: "12px", color: "grey" }}>
                Target daily calories
              </span>
              <StyledInput
                value={calories}
                type="number"
                placeholder="Target daily calories"
                onChange={(e) => setCalories(e.target.value)}
              ></StyledInput>
            </MenuItem>
            <MenuItem>
              <span style={{ fontSize: "12px", color: "grey" }}>
                Target daily protein
              </span>
              <StyledInput
                value={proteinPercentage}
                type="number"
                placeholder="Daily protein %"
                onChange={(e) => setProteinPercentage(e.target.value)}
              ></StyledInput>
            </MenuItem>
            <MenuItem>
              <span style={{ fontSize: "12px", color: "grey" }}>
                Target daily carbs
              </span>
              <StyledInput
                value={carbsPercentage}
                type="number"
                placeholder="Daily carbs %"
                onChange={(e) => setCarbsPercentage(e.target.value)}
              ></StyledInput>
            </MenuItem>
            <MenuItem>
              <span style={{ fontSize: "12px", color: "grey" }}>
                Target daily fat
              </span>
              <StyledInput
                value={fatPercentage}
                type="number"
                placeholder="Daily fat %"
                onChange={(e) => setFatPercentage(e.target.value)}
              ></StyledInput>
            </MenuItem>
          </SectionBody>
        </Section>
        <UpdateButton>Update</UpdateButton>
      </Body>
    </Wrapper>
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

const H2 = styled.h2`
  text-align: left;
`;

const Underline = styled.div`
  margin-top: -10px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

const Avatar = styled.img`
  max-width: 50px;
  border-radius: 10px;
  box-sizing: border-box;
  object-fit: cover;
`;

const Body = styled(Header)`
  justify-content: center;
  flex-wrap: wrap;
  max-width: 340px;
  row-gap: 20px;
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

const StyledInput = styled.input`
  font-size: 15px;
  border-radius: 5px;
`;

const StyledSelect = styled.select`
  font-family: var(--font-body);
  font-size: 15px;
  min-height: 40px;
  border-radius: 5px;
  color: var(--color-background);
  padding: 0 10px;
`;

const UpdateButton = styled.button`
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

export default ProfileSetup;
