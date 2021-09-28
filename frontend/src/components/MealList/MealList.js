import React from "react";
import styled from "styled-components";

import MealCard from "./MealCard";

const MealList = ({ mealData }) => {
  const {
    data: {
      meals,
      nutrients: { calories, carbohydrates, fat },
    },
    status,
  } = mealData;

  return (
    <Wrapper>
      {meals.map((meal) => {
        const { id, imageType, readyInMinutes, servings, sourceUrl, title } =
          meal;

        return (
          <MealCard
            key={id}
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  /* background-color: tomato; */
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  justify-content: space-between;
  padding-bottom: 40px;
`;

export default MealList;
