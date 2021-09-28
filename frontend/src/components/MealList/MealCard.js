import React from "react";
import styled from "styled-components";

const MealCard = ({ mealData }) => {
  const { id, imageType, readyInMinutes, servings, sourceUrl, title } =
    mealData;
  return (
    <Wrapper>
      <StyledImg
        src={`https://spoonacular.com/recipeImages/${id}-636x393.${imageType}`}
        alt={title}
      ></StyledImg>
      <InfoWrapper>
        <StyledH2>{title}</StyledH2>
        <div>{readyInMinutes} minutes</div>
        <div>{servings} servings</div>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: inherit;
  max-width: 375px;
  background-color: var(--color-midground);
  border-radius: 20px;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  box-sizing: border-box;
  object-fit: cover;
`;

const InfoWrapper = styled.div`
  padding: 10px;
`;

const StyledH2 = styled.h2`
  font-size: 20px;
  text-align: left;
  margin-bottom: 5px;
`;

export default MealCard;