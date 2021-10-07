import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MealCard = ({ mealData }) => {
  const { id, imageType, readyInMinutes, servings, title } =
    mealData;
  return (
    <Wrapper>
      <StyledNavLink to={`/search/recipe/${id}`}>
        <StyledImg
          src={`https://spoonacular.com/recipeImages/${id}-636x393.${imageType}`}
          alt={title}
        ></StyledImg>
        <InfoWrapper>
          <StyledH2>{title}</StyledH2>
          <div>{readyInMinutes} minutes</div>
          <div>{servings} servings</div>
        </InfoWrapper>
      </StyledNavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: inherit;
  aspect-ratio: 1/1.3;
  max-width: 337px;
  background-color: var(--color-midground);
  border-radius: 20px;
  justify-content: flex-start;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
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
  font-size: 18px;
  text-align: left;
  margin-bottom: 5px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export default MealCard;
