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
  const [minCarbs, setMinCarbs] = useState("");
  const [maxCarbs, setMaxCarbs] = useState("");
  const [minProtein, setMinProtein] = useState("");
  const [maxProtein, setMaxProtein] = useState("");
  const [minFat, setMinFat] = useState("");
  const [maxFat, setMaxFat] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [sort, setSort] = useState(`random`);
  const [exclude, setExclude] = useState("");
  const [include, setInclude] = useState("");
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
    };

    // GET MIN MAX VALUES FROM TARGET MACRO VALUES
    const {
      Calories: { minCalories, maxCalories },
    } = getMinMax(nutritionQueryObj);

    // CONSTRUCT QUERY STRING OBJECT TO BE PROCESSED
    const queryStringObj = {
      cuisine: cuisine,
      diet: diet,
      intolerances: intolerances,
      excludeIngredients: exclude,
      includeIngredients: include,
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
                value={minCarbs}
                type="number"
                placeholder="Min carbs"
                onChange={(e) => {
                  setMinCarbs(e.target.value);
                }}
              />
              <StyledMiniInput
                value={minProtein}
                type="number"
                placeholder="Min protein"
                onChange={(e) => {
                  setMinProtein(e.target.value);
                }}
              />
              <StyledMiniInput
                value={minFat}
                type="number"
                placeholder="Min fat"
                onChange={(e) => {
                  setMinFat(e.target.value);
                }}
              />
            </MacroInputWrapper>
            <MacroInputWrapper>
              <StyledMiniInput
                value={maxCarbs}
                type="number"
                placeholder="Max carbs"
                onChange={(e) => {
                  setMaxCarbs(e.target.value);
                }}
              />
              <StyledMiniInput
                value={maxProtein}
                type="number"
                placeholder="Max protein"
                onChange={(e) => {
                  setMaxProtein(e.target.value);
                }}
              />
              <StyledMiniInput
                value={maxFat}
                type="number"
                placeholder="Max fat"
                onChange={(e) => {
                  setMaxFat(e.target.value);
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
                  <option key={cuisine} value={cuisine.toLowerCase()}>
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
                  <option key={diet} value={diet.toLowerCase()}>
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
                  <option key={intolerance} value={intolerance.toLowerCase()}>
                    {intolerance}
                  </option>
                );
              })}
            </StyledSelect>
            <StyledSelect
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
            <StyledInput
              value={include}
              type="string"
              placeholder="Including (e.g. egg) (optional)"
              onChange={(e) => {
                setInclude(e.target.value);
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
  padding: 0 10px;
`;

const StyledInput = styled.input`
  font-size: 15px;
  width: inherit;
  border-radius: 10px;
  box-sizing: border-box;
`;

const StyledMiniInput = styled(StyledInput)`
  width: 30%;
  font-size: 13px;
`;

const SearchButton = styled.button`
  margin-top: 15px;
  font-size: 20px;
  width: 100%;
  height: 40px;
  max-height: 40px;
  background-color: var(--color-button);
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

export default CustomSearch;
