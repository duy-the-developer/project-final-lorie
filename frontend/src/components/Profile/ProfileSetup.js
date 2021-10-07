import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";

import { StyledSliderIcon } from "../utils/StyledIcons";
import { dietTypes, intoleranceTypes } from "../utils/cuisinesData";

import { UserContext } from "../ContextProviders/UserContext";

import Header from "../Header/Header";

const ProfileSetup = () => {
  const { user } = useAuth0();
  const [needRefresh, setNeedRefresh] = useState(false);

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

  const [caloriesDisplay, setCalories] = useState(targetDailyCalories);
  const [dietDisplay, setDiet] = useState(dietType);
  const [intolerancesDisplay, setIntolerances] = useState(intolerances);
  const [proteinPercentageDisplay, setProteinPercentage] =
    useState(proteinPercentage);
  const [carbsPercentageDisplay, setCarbsPercentage] =
    useState(carbsPercentage);
  const [fatPercentageDisplay, setFatPercentage] = useState(fatPercentage);

  const history = useHistory();

  const { sub } = user;

  const handleUpdateUserInfo = () => {
    setNeedRefresh(true);

    const bodyObject = {
      targetDailyCalories: caloriesDisplay,
      proteinPercentage: proteinPercentageDisplay,
      carbsPercentage: carbsPercentageDisplay,
      fatPercentage: fatPercentageDisplay,
      dietType: dietDisplay,
      intolerances: intolerancesDisplay,
    };

    // INITATE REQUEST OBJECT
    const reqObject = {
      method: "PUT",
      body: JSON.stringify(bodyObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`/user/${sub}`, reqObject)
      .then((res) => res.json())
      .then((parsedData) => {
        console.log(parsedData);
        getUserInfo(parsedData);
        history.push("/profile");
      })
      .catch((error) => console.log(error));

    setNeedRefresh(false);
  };

  return (
    <Wrapper>
      <Header />

      <Body>
        {!needRefresh && (
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
                      <>
                        {diet.toLocaleLowerCase() === dietDisplay ? (
                          <option
                            selected
                            key={diet}
                            value={diet.toLowerCase()}
                          >
                            {diet}
                          </option>
                        ) : (
                          <option key={diet} value={diet.toLowerCase()}>
                            {diet}
                          </option>
                        )}
                      </>
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
                      <>
                        {intolerance.toLocaleLowerCase() ===
                        intolerancesDisplay ? (
                          <option
                            selected
                            key={intolerance}
                            value={intolerance.toLowerCase()}
                          >
                            {intolerance}
                          </option>
                        ) : (
                          <option
                            key={intolerance}
                            value={intolerance.toLowerCase()}
                          >
                            {intolerance}
                          </option>
                        )}
                      </>
                    );
                  })}
                </StyledSelect>
              </MenuItem>
              <MenuItem>
                <span style={{ fontSize: "12px", color: "grey" }}>
                  Target daily calories
                </span>
                <StyledInput
                  value={caloriesDisplay}
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
                  value={proteinPercentageDisplay}
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
                  value={carbsPercentageDisplay}
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
                  value={fatPercentageDisplay}
                  type="number"
                  placeholder="Daily fat %"
                  onChange={(e) => setFatPercentage(e.target.value)}
                ></StyledInput>
              </MenuItem>
            </SectionBody>
          </Section>
        )}
      </Body>
      <UpdateButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleUpdateUserInfo();
        }}
      >
        Update
      </UpdateButton>
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
  padding-bottom: 40px;
`;

const Body = styled.div`
  justify-content: center;
  flex-wrap: wrap;
  max-width: 340px;
  row-gap: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  margin-top: -20px;

  &:active {
    opacity: 0.5;
  }
`;

export default ProfileSetup;
