import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

const SingleRecipe = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  console.log(id);

  const reqObject = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    fetch(`/recipe/${id}`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipeData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <Wrapper>SingleRecipe</Wrapper>;
};

const Wrapper = styled.div`
  color: var(--color-text);
`;

export default SingleRecipe;
