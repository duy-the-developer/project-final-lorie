import React from "react";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../../utils/utils";

const IngredientList = ({ ingredients }) => {
  return (
    <Wrapper>
      {ingredients.map((ingredient) => {
        const {
          amount: {
            metric: { value, unit },
          },
          image,
          name,
        } = ingredient;
        return (
          <IngredientWrapper>
            <StyledImage
              src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
            ></StyledImage>
            <InfoWrapper>
              <Name>{`${capitalizeFirstLetter(name)}`}</Name>
              <Amount>{`${value}
              ${unit}`}</Amount>
            </InfoWrapper>
          </IngredientWrapper>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
  row-gap: 10px;
`;

const IngredientWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  column-gap: 10px;
`;

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
  background-color: white;
`;

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Amount = styled.div``;

const InfoWrapper = styled.div``;

export default IngredientList;
