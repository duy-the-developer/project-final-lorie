// IMPORT DEPENDENCIES
import React, { useState } from "react";
import styled from "styled-components";

// IMPORT UTILITY FUNCTIONS
import {
  getMinMax,
  getQueryString,
  capitalizeFirstLetter,
} from "../utils/utils";

// IMPORT COMPONENTS
import { StyledSliderIcon } from "../utils/StyledIcons";
import MealList from "../MealList/MealList";

// IMPORT DATA
import {
  cuisines,
  dietTypes,
  intoleranceTypes,
  sortTypes,
} from "../utils/cuisinesData";
import { useParams } from "react-router";

const CustomSearch = () => {
  // INITIATE STATES
  const { type } = useParams();
  console.log(capitalizeFirstLetter(type));
  const [calories, setCalories] = useState("");
  const [carbsPercentage, setCarbsPercentage] = useState("");
  const [proteinPercentage, setProteinPercentage] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [sort, setSort] = useState(`random`);
  const [exclude, setExclude] = useState("");
  const [mealData, setMealData] = useState(
    JSON.parse(window.localStorage.getItem(`${type}SearchLastResult`)) || null
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

    // CALCULATE TARGET MACRO VALUES AS A % OF CALORIES
    const nutritionQueryObj = {
      Calories: calories,
      Carbs: Math.round(((carbsPercentage / 100) * calories) / 4),
      Protein: Math.round(((proteinPercentage / 100) * calories) / 4),
      Fat: Math.round(((fatPercentage / 100) * calories) / 9),
    };

    // GET MIN MAX VALUES FROM TARGET MACRO VALUES
    const {
      Calories: { minCalories, maxCalories },
      Carbs: { minCarbs, maxCarbs },
      Protein: { minProtein, maxProtein },
      Fat: { minFat, maxFat },
    } = getMinMax(nutritionQueryObj);

    // CONSTRUCT QUERY STRING OBJECT TO BE PROCESSED
    const queryStringObj = {
      cuisine: cuisine,
      diet: diet,
      intolerances: intolerances,
      excludeIngredients: exclude,
      type: type,
      minCalories: minCalories,
      maxCalories: maxCalories,
      minCarbs: minCarbs,
      maxCarbs: maxCarbs,
      minProtein: minProtein,
      maxProtein: maxProtein,
      minFat: minFat,
      maxFat: maxFat,
      sort: sort,
      isStrictMode: false,
      offset: Math.floor(Math.random() * 5),
    };

    // GET QUERY STRING USING HELPER FUNCTION
    const queryString = getQueryString(queryStringObj);
    console.log(queryString);

    // FETCH DATA, UPDATE STATE AND SAVE IN LOCAL STORAGE
    fetch(`/complexSearch/?${queryString}`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        setMealData(data);
        window.localStorage.setItem(
          `${type}SearchLastResult`,
          JSON.stringify(data)
        );
      })
      .catch((error) => {
        console.log(error);
      });

    // HIDE ADVANCED SEARCH DISPLAY
    if (isAdvancedSearch) {
      setIsAdvancedSearch(!isAdvancedSearch);
    }
  };

  // RENDER
  return (
    <Wrapper>
      <StyledH1>{`${capitalizeFirstLetter(type)}`}</StyledH1>
      <Underline />
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
              <StyledMiniInput
                value={carbsPercentage}
                type="number"
                placeholder="Carbs %"
                onChange={(e) => {
                  setCarbsPercentage(e.target.value);
                }}
              />
              <StyledMiniInput
                value={proteinPercentage}
                type="number"
                placeholder="Protein %"
                onChange={(e) => {
                  setProteinPercentage(e.target.value);
                }}
              />
              <StyledMiniInput
                value={fatPercentage}
                type="number"
                placeholder="Fat %"
                onChange={(e) => {
                  setFatPercentage(e.target.value);
                }}
              />
            </MacroInputWrapper>
            <StyledSelect
              value={cuisine}
              id="cuisine"
              name="cuisine"
              onChange={(e) => {
                setCuisine(e.target.value);
              }}
            >
              <option value="">Cuisine - Pick one (optional)</option>
              {cuisines.map((cuisine) => {
                return (
                  <option key={cuisine} value={cuisine.toLowerCase()}>
                    {cuisine}
                  </option>
                );
              })}
            </StyledSelect>
            <StyledSelect
              value={diet}
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
            <StyledSelect
              value={intolerances}
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
            <StyledSelect
              value={sort}
              id="sort"
              name="sort"
              onChange={(e) => {
                setIntolerances(e.target.value);
              }}
            >
              <option value="random">
                Sort by - Pick one (default: Random)
              </option>
              {sortTypes.map((sort) => {
                return (
                  <option key={sort} value={sort.toLowerCase()}>
                    {sort}
                  </option>
                );
              })}
            </StyledSelect>
            <StyledInput
              value={exclude}
              type="string"
              placeholder="Excluding (e.g. milk) (optional)"
              onChange={(e) => {
                setExclude(e.target.value);
              }}
            />
          </>
        )}
        <SearchButton onClick={handleSearchSubmit}>Search</SearchButton>
      </ControlsWrapper>
      {mealData && (
        <DisplayWrapper>
          {mealData.data.results[0] ? (
            <MealList mealData={mealData} />
          ) : (
            <StyledH1
              style={{
                textAlign: "left",
                marginTop: "20%",
                paddingBottom: "10px",
              }}
            >
              No recipe found, please remove some search criteria and try again.
            </StyledH1>
          )}
        </DisplayWrapper>
      )}
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
  text-align: left;
  display: flex;
  margin-bottom: 0;
  font-size: 40px;
  font-style: italic;
  z-index: 1;
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
  margin-top: 20px;
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

const StyledMiniInput = styled(StyledInput)`
  width: 30%;
`;

const SearchButton = styled.button`
  margin-top: 15px;
  font-size: 24px;
  width: 100%;
  background-color: var(--color-button);
  color: var(--color-text);
  border: none;
  box-sizing: border-box;
  border-radius: 10px;

  &:active {
    opacity: 0.5;
  }
`;

const Underline = styled.div`
  margin-top: -10px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

export default CustomSearch;
