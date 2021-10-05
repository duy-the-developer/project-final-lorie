import React from "react";
import styled from "styled-components";

import MealCard from "./MealCard";

const MealList = ({ mealData }) => {
  const {
    data: { meals },
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
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export default MealList;
