import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../ContextProviders/UserContext";
import MealCard from "../MealList/MealCard";
import { StyledDeleteIcon } from "../utils/StyledIcons";

const Bookmark = () => {
  const [newPlanName, setNewPlanName] = useState("");

  const {
    state: {
      isLoaded,
      userContextData: { _id, favouriteMeals, mealPlans },
    },
    action: { getUserInfo },
  } = useContext(UserContext);

  const handleAddingNewPlan = (e) => {
    e.preventDefault();

    const bodyObject = {
      userId: _id,
      newPlanName: newPlanName,
    };

    const reqObject = {
      method: "POST",
      body: JSON.stringify(bodyObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`/mealplans`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        getUserInfo(data);
      })
      .catch((error) => console.log(error));

    setNewPlanName("");
  };

  const handleDeletePlan = (index, id) => {
    console.log(id);

    const bodyObject = {
      userId: _id,
      planIndex: index,
      planId: id,
    };

    const reqObject = {
      method: "DELETE",
      body: JSON.stringify(bodyObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`/mealplans`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        getUserInfo(data);
      })
      .catch((error) => console.log(error));
  };

  console.log(mealPlans);
  return (
    <Wrapper>
      <StyledSection>
        <TitleSection>
          <StyledH1>Meal Plans</StyledH1>
          <Underline />
        </TitleSection>
        <NewPlanSection>
          <StyledInput
            value={newPlanName}
            type="text"
            placeholder="New Plan Name"
            onChange={(e) => {
              setNewPlanName(e.target.value);
            }}
          />
          <StyledButton onClick={handleAddingNewPlan}>Add</StyledButton>
        </NewPlanSection>
        <Container>
          {isLoaded &&
            mealPlans.map((mealPlan) => {
              const planIndex = mealPlans.indexOf(mealPlan);

              const {
                name,
                id,
                totalNutrition: {
                  totalCal,
                  totalCarbs,
                  totalFat,
                  totalProtein,
                },
                recipes,
              } = mealPlan;

              return (
                <MealPlanItem key={id} name={name} id={id}>
                  <StyledNavLink
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "2px",
                    }}
                    to={`/bookmark/${id}`}
                  >
                    <StyledH2>
                      {name} - {recipes.length} recipe(s){" "}
                    </StyledH2>
                    {totalCal} kCal, {totalProtein} protein, {totalCarbs} carbs,{" "}
                    {totalFat} fat
                  </StyledNavLink>
                  <button
                    onClick={(e) => handleDeletePlan(planIndex, id)}
                    style={{
                      background: "inherit",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                    }}
                  >
                    <StyledDeleteIcon />
                  </button>
                </MealPlanItem>
              );
            })}
        </Container>
      </StyledSection>
      <StyledSection>
        <TitleSection>
          <StyledH1>Favourites</StyledH1>
          <Underline />
        </TitleSection>
        <Container>
          {isLoaded &&
            favouriteMeals.map((meal) => {
              const {
                id,
                information: {
                  imageType,
                  readyInMinutes,
                  servings,
                  sourceUrl,
                  title,
                },
              } = meal;
              return (
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
  column-gap: 40px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
`;

const StyledSection = styled.section`
  width: 100%;
  max-width: 338px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 40px;
`;

const StyledInput = styled.input`
  font-size: 15px;
  width: inherit;
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  width: 100%;
`;

const StyledButton = styled.button`
  font-size: 15px;
  padding: 10px;
  border: none;
  outline: none;
  background: var(--color-button);
  /* border-radius: 0 0 10px 10px; */
  width: 100%;

  &:active {
    opacity: 0.5;
  }
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

const NewPlanSection = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Underline = styled.div`
  margin-top: -10px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

const MealPlanItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-underline2);
  border-radius: 0px;
  font-size: 15px;
  padding: 10px;
  border: none;
  outline: none;
  background: var(--color-button);
  /* border-radius: 0 0 10px 10px; */
  width: 100%;

  &:active {
    opacity: 0.5;
  }
`;

const StyledH2 = styled.h2`
  font-size: 18px;
  text-align: left;
  margin-bottom: 5px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export default Bookmark;
