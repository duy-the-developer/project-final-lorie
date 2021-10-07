import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router";
import styled from "styled-components";

import MealCard from "../MealList/MealCard";
import {
  StyledBackIcon,
  StyledEditIcon,
  StyledDeleteIcon,
} from "../utils/StyledIcons";

import { UserContext } from "../ContextProviders/UserContext";

import { getShoppingList } from "../utils/utils";
import IngredientList from "../SingleRecipe/IngredientList";

const SingleMealPlan = () => {
  const { planIndex, planId } = useParams();
  const history = useHistory();
  const [displayEditMenu, setDisplayEditMenu] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const {
    state: {
      isLoaded,
      userContextData: {
        _id,
        mealPlans,
        settings: {
          targetDailyCalories,
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

  const currentPlan = mealPlans.find((plan) => {
    return plan.id === planId;
  });

  const {
    name,
    recipes,
    totalNutrition: { totalCal, totalCarbs, totalFat, totalProtein },
  } = currentPlan;

  const shoppingList = getShoppingList(recipes);

  const targetDailyCarbs = Math.round(
    ((carbsPercentage / 100) * targetDailyCalories) / 4
  );
  const targetDailyProtein = Math.round(
    ((proteinPercentage / 100) * targetDailyCalories) / 4
  );
  const targetDailyFat = Math.round(
    ((fatPercentage / 100) * targetDailyCalories) / 9
  );

  const proteinBar = Math.round((totalProtein / targetDailyProtein) * 50);
  const carbsBar = Math.round((totalCarbs / targetDailyCarbs) * 50);
  const fatBar = Math.round((totalFat / targetDailyFat) * 50);

  const handleDeleteRecipe = (recipeIndex, recipeId, planId, userId) => {
    const bodyObject = {
      recipeIndex: recipeIndex,
      recipeId: recipeId,
      planId: planId,
      planIndex: +planIndex,
      userId: userId,
    };

    const reqObject = {
      method: "PUT",
      body: JSON.stringify(bodyObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`/mealplans/remove`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        getUserInfo(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div onClick={() => history.goBack()}>
          <StyledBackIcon />
        </div>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={(e) => setDisplayEditMenu(!displayEditMenu)}
        >
          <StyledEditIcon />
        </div>
      </div>
      <StyledSection>
        <TitleSection>
          <StyledH1>{name}</StyledH1>
          <Underline />
        </TitleSection>
        <InfoWrapper>
          <NutritionWrapper>
            <NutritionTitles>
              <Row>
                <IngredientLine
                  style={{
                    background: "var(--color-highlight)",
                    color: "var(--color-background)",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    marginBottom: "10px",
                    width: "auto",
                    fontSize: "15px",
                  }}
                >
                  {totalCal}/{targetDailyCalories} kCalories -{" "}
                  {currentPlan.recipes.length} recipes
                </IngredientLine>
              </Row>
              <Row>
                <IngredientLine>
                  Protein: {totalProtein}/{targetDailyProtein}g
                </IngredientLine>
                <Bar
                  id="protein"
                  style={{
                    width: `${proteinBar}%`,
                  }}
                ></Bar>
              </Row>
              <Row>
                <IngredientLine>
                  Carbs: {totalCarbs}/{targetDailyCarbs}g
                </IngredientLine>
                <Bar
                  id="carbs"
                  style={{
                    width: `${carbsBar}%`,
                  }}
                ></Bar>
              </Row>

              <Row>
                <IngredientLine>
                  Fat: {totalFat}/{targetDailyFat}g
                </IngredientLine>
                <Bar
                  id="fat"
                  style={{
                    width: `${fatBar}%`,
                  }}
                ></Bar>
              </Row>
            </NutritionTitles>
          </NutritionWrapper>
        </InfoWrapper>
        <InfoWrapper style={{ padding: "0" }}>
          <StyledButton onClick={(e) => setShowShoppingList(!showShoppingList)}>
            Show Shopping List
          </StyledButton>
          {showShoppingList && <IngredientList ingredients={shoppingList} />}
        </InfoWrapper>
        <Container>
          {isLoaded &&
            recipes.map((recipe) => {
              const {
                id,
                information: {
                  imageType,
                  readyInMinutes,
                  servings,
                  sourceUrl,
                  title,
                },
              } = recipe;

              const recipeIndex = recipes.indexOf(recipe);

              return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <MealCard
                    mealData={{
                      id: id,
                      imageType: imageType,
                      readyInMinutes: readyInMinutes,
                      servings: servings,
                      sourceUrl: sourceUrl,
                      title: title,
                    }}
                  />
                  <StyledDeleteButton
                    style={{ display: !displayEditMenu && "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteRecipe(recipeIndex, id, planId, _id);
                    }}
                  >
                    <StyledDeleteIcon />
                  </StyledDeleteButton>
                </div>
              );
            })}
        </Container>
      </StyledSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-text);
  margin: var(--margin-page);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const StyledSection = styled.section`
  width: 100%;
  max-width: 338px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 40px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const StyledH1 = styled.h1`
  text-align: left;
  display: flex;
  margin-bottom: 0;
  font-size: 40px;
  font-style: italic;
  z-index: 1;
`;

const Underline = styled.div`
  margin-top: -10px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

const NutritionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NutritionTitles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  /* background: tomato; */
`;

const IngredientLine = styled.div`
  width: 40%;
  padding: 0 0px;
  margin-right: 10px;
  font-size: 14px;
`;

const Bar = styled.div`
  height: 15px;
  background: var(--color-underline2);
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
  background: var(--color-midground);
  border-radius: 20px;
`;

const StyledDeleteButton = styled.button`
  width: 100%;
  position: relative;
  right: 44px;
  background: var(--color-button);
  border-radius: 0 20px 20px 0;
  border: 1px solid var(--color-button);
  transition: all 0.2s ease-out;

  &:active {
    background: tomato;
    border: 1px solid tomato;
  }
`;

const StyledButton = styled.button`
  font-size: 15px;
  width: 100%;
  height: 50px;
  background-color: var(--color-button);
  color: var(--color-text);
  border: none;
  box-sizing: border-box;
  border-radius: 10px;

  &:active {
    opacity: 0.5;
  }
`;
export default SingleMealPlan;
