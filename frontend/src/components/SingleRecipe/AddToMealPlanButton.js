import React, { useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import styled from "styled-components";

const AddToMealPlanButton = ({ recipeId, recipeData, userId, mealPlans }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");

  console.log(
    `Inside AddToMealPlan.js`,
    recipeId,
    recipeData,
    userId,
    mealPlans
  );

  const handleButtonPress = (e) => {
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
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <div onClick={handleButtonPress}>
        <StyledBookMark />
      </div>
      <MealPlanList style={{ display: !isDisplayed && "none" }}>
        <NewPlanSection>
          <StyledInput
            value={newPlanName}
            type="text"
            placeholder="New Plan Name"
            onChange={(e) => {
              setNewPlanName(e.target.value);
            }}
          ></StyledInput>
          <StyledButton onClick={handleAddingNewPlan}>Add</StyledButton>
        </NewPlanSection>
        {mealPlans.map((mealPlan) => {
          return <MealPlanItem>mealPlan.name</MealPlanItem>;
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
  padding: 10px;
`;

const NewPlanSection = styled.div`
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
  background: var(--color-underline2);
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

const MealPlanItem = styled.div`
  font-size: 30px;
`;

export default AddToMealPlanButton;
