import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const FavouriteButton = ({ recipeId, recipeData, userId }) => {
  console.log(`In Fav Button`, recipeId, recipeData, userId);

  return (
    <div>
      <StyledFavourite />
    </div>
  );
};

const StyledFavourite = styled(AiOutlineStar)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

export default FavouriteButton;
