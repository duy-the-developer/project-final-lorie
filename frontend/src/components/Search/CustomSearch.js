// IMPORT DEPENDENCIES
import React, { useState } from "react";
import styled from "styled-components";

// IMPORT UTILITY FUNCTIONS
import { getMinMax, getQueryString } from "../../utils/utils";

// IMPORT COMPONENTS
import { StyledSliderIcon } from "../StyledIcons";
import MealList from "../MealList/MealList";

// IMPORT DATA
import {
  cuisines,
  dietTypes,
  intoleranceTypes,
} from "../../utils/cuisinesData";

const CustomSearch = () => {
  // INITIATE STATES
  const [calories, setCalories] = useState(500);
  const [carbsPercentage, setCarbsPercentage] = useState(null);
  const [proteinPercentage, setProteinPercentage] = useState(null);
  const [fatPercentage, setFatPercentage] = useState(null);
  const [cuisine, setCuisine] = useState("");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [exclude, setExclude] = useState("");
  const [mealData, setMealData] = useState(
    JSON.parse(window.localStorage.getItem(`customSearchLastResult`)) || null
  );

  // HANDLERS
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const reqObject = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const nutritionQueryObj = {
      Calories: calories,
      Carbs: Math.round(((carbsPercentage / 100) * calories) / 4),
      Protein: Math.round(((proteinPercentage / 100) * calories) / 4),
      Fat: Math.round(((fatPercentage / 100) * calories) / 9),
    };

    const {
      Calories: { minCalories, maxCalories },
      Carbs: { minCarbs, maxCarbs },
      Protein: { minProtein, maxProtein },
      Fat: { minFat, maxFat },
    } = getMinMax(nutritionQueryObj);

    const queryStringObj = {
      cuisine: cuisine,
      diet: diet,
      intolerances: intolerances,
      exclude: exclude,
      // type: type,
      minCalories: minCalories,
      maxCalories: maxCalories,
      minCarbs: minCarbs,
      maxCarbs: maxCarbs,
      minProtein: minProtein,
      maxProtein: maxProtein,
      minFat: minFat,
      maxFat: maxFat,
      isStrictMode: false,
    };

    const queryString = getQueryString(queryStringObj);

    console.log(queryString);

    fetch(`/complexSearch/?${queryString}`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        setMealData(data);
        window.localStorage.setItem(
          `customSearchLastResult`,
          JSON.stringify(data)
        );
      })
      .catch((error) => {
        console.log(error);
      });

    if (isAdvancedSearch) {
      setIsAdvancedSearch(!isAdvancedSearch);
    }
  };

  // RENDER
  return (
    <Wrapper>
      <StyledH1>Custom Recipe Search</StyledH1>
      <ControlsWrapper>
        <InputWrapper>
          <StyledInput
            value={calories}
            type="number"
            placeholder="Target calories per meal (e.g. 500)"
            onChange={(e) => {
              setCalories(e.target.value);
            }}
          />
          <SliderButton
            onClick={() => {
              setIsAdvancedSearch(!isAdvancedSearch);
            }}
          >
            <StyledSliderIcon />
          </SliderButton>
        </InputWrapper>
        {isAdvancedSearch && (
          <>
            <MacroInputWrapper>
              <StyledInput
                value={carbsPercentage}
                style={{ width: "30%" }}
                type="number"
                placeholder="Carbs %"
                onChange={(e) => {
                  setCarbsPercentage(e.target.value);
                }}
              />
              <StyledInput
                value={proteinPercentage}
                style={{ width: "30%" }}
                type="number"
                placeholder="Protein %"
                onChange={(e) => {
                  setProteinPercentage(e.target.value);
                }}
              />
              <StyledInput
                value={fatPercentage}
                style={{ width: "30%" }}
                type="number"
                placeholder="Fat %"
                onChange={(e) => {
                  setFatPercentage(e.target.value);
                }}
              />
            </MacroInputWrapper>
            <StyledSelect
              id="cuisine"
              name="cuisine"
              onChange={(e) => {
                setCuisine(e.target.value);
              }}
            >
              <option value="">Cuisine - Pick one (optional)</option>
              {cuisines.map((cuisine) => {
                return (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                );
              })}
            </StyledSelect>
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
                  <option key={diet} value={diet}>
                    {diet}
                  </option>
                );
              })}
            </StyledSelect>
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
                  <option key={intolerance} value={intolerance}>
                    {intolerance}
                  </option>
                );
              })}
            </StyledSelect>
            <StyledInput
              value={exclude}
              type="string"
              placeholder="Excluding (e.g. milk)"
              onChange={(e) => {
                setExclude(e.target.value);
              }}
            />
          </>
        )}
        <SearchButton onClick={handleSearchSubmit}>Search</SearchButton>
      </ControlsWrapper>
      <DisplayWrapper>
        {mealData && <MealList mealData={mealData} />}
      </DisplayWrapper>
    </Wrapper>
  );
};

// STYLING
const Wrapper = styled.div`
  color: var(--color-text);
  margin: var(--margin-page);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const MacroInputWrapper = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
`;

const StyledH1 = styled.h1`
  display: flex;
  margin-bottom: 5vw;
`;

const ControlsWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const DisplayWrapper = styled(ControlsWrapper)`
  flex-direction: row;
`;

const SliderButton = styled.button`
  background: transparent;
  color: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
  align-items: center;
  column-gap: 2vw;
`;

const StyledSelect = styled.select`
  font-family: var(--font-body);
  font-size: 15px;
  min-height: 40px;
  border-radius: 10px;
  color: var(--color-background);
`;

const StyledInput = styled.input`
  font-size: 15px;
  width: inherit;
  border-radius: 10px;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  margin-top: 15px;
  font-size: 24px;
  width: 100%;
  background-color: var(--color-midground);
  color: var(--color-text);
  border: none;
  box-sizing: border-box;
  border-radius: 10px;

  &:active {
    opacity: 0.5;
  }
`;

export default CustomSearch;
