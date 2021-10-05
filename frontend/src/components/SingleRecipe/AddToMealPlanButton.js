import React, { useEffect, useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import styled from "styled-components";

const AddToMealPlanButton = ({ recipeId, recipeData, userId }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [mealPlans, setMealPlans] = useState([]);

  console.log(userId, `userId`);

  useEffect(() => {
    const reqObject = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    console.log(`userId in MealPlan Button`, userId);

    fetch(`/mealplans/${userId}`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMealPlans(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDisplayMealPlanMenu = (e) => {
    e.preventDefault();

    setIsDisplayed(!isDisplayed);
  };

  const handleAddingNewPlan = (e) => {
    e.preventDefault();

    const { information, instructions, nutrition } = recipeData;

    const bodyObject = {
      id: recipeId,
      information: information,
      instructions: instructions,
      nutrition: nutrition,
      userId: userId,
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
        setMealPlans(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));

    setNewPlanName("");
  };

  const handleAddRecipeToMealPlan = (e) => {
    e.preventDefault();

    const { information, instructions, nutrition } = recipeData;

    const bodyObject = {
      recipeId: recipeId,
      information: information,
      instructions: instructions,
      nutrition: nutrition,
      userId: userId,
      planId: e.target.id,
    };

    const reqObject = {
      method: "PUT",
      body: JSON.stringify(bodyObject),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`/mealplans/add`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMealPlans(data.data);
      })
      .catch((error) => console.log(error));

    setIsDisplayed(false);
  };

  return (
    <Wrapper>
      <div onClick={handleDisplayMealPlanMenu}>
        <StyledBookMark />
      </div>
      <MealPlanList
        style={{ display: !isDisplayed && "none" }}
        onMouseLeave={() => {
          setIsDisplayed(false);
        }}
      >
        <StyledH1>Meal Plans</StyledH1>
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
        {mealPlans[0] &&
          mealPlans.map((mealPlan) => {
            const {
              name,
              id,
              totalNutrition: { totalCal, totalCarbs, totalFat, totalProtein },
              recipes,
            } = mealPlan;
            return (
              <MealPlanItem
                key={id}
                name={name}
                id={id}
                onClick={handleAddRecipeToMealPlan}
              >
                {name} <br />
                Total: {recipes.length} recipe(s), {totalCal} kCal
              </MealPlanItem>
            );
          })}
      </MealPlanList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 5px;
  z-index: 2;
`;

const StyledBookMark = styled(BsBookmarkFill)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 25px;
  max-height: 25px;
`;

const MealPlanList = styled.div`
  position: absolute;
  right: 40px;
  margin-top: 10px;
  min-height: 200px;
  min-width: 300px;
  background: var(--color-midground);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 10px;
  row-gap: 10px;
`;

const NewPlanSection = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledButton = styled.button`
  font-size: 15px;
  padding: 10px;
  border: none;
  outline: none;
  background: var(--color-button);
  /* border-radius: 0 0 10px 10px; */
  width: 90%;

  &:active {
    opacity: 0.5;
  }
`;

const StyledInput = styled.input`
  font-size: 15px;
  width: inherit;
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  width: 90%;
`;

const MealPlanItem = styled(StyledButton)`
  background: var(--color-underline2);
  border-radius: 0px;
`;

const StyledH1 = styled.h1`
  text-align: left;
  display: flex;
  margin: 0 0;
  font-size: 30px;
  font-style: italic;
  z-index: 1;
  width: 90%;
`;

export default AddToMealPlanButton;
