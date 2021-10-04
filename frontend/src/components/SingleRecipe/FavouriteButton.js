import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

const FavouriteButton = ({ recipeId, recipeData, userId, favouriteMeals }) => {
  console.log(`In Fav Button`, recipeData);

  // INITIALIZE STATES
  const [isFavouriteByUser, setIsFavouriteByUser] = useState(false);

  // CHECK IF USER ALREADY FAVOURITE THIS RECIPE
  useEffect(() => {
    if (
      favouriteMeals.find((meal) => {
        return meal.id === recipeId;
      })
    ) {
      setIsFavouriteByUser(true);
    }
  }, [favouriteMeals]);

  // FAVOURITE BUTTON HANDLER
  const handleFavourite = (e) => {
    e.preventDefault();

    const { information, instructions, nutrition } = recipeData;

    const bodyObject = {
      id: recipeId,
      information: information,
      instructions: instructions,
      nutrition: nutrition,
      userId: userId,
    };

    // IF IS NOT FAVOURITE BY USER, ADD TO FAVOURITE
    if (!isFavouriteByUser) {
      const reqObject = {
        method: "PUT",
        body: JSON.stringify(bodyObject),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch(`/favourite`, reqObject)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } 
    
    // IF RECIPE IS ALREADY FAVOURITED, REMOVE IT
    else {
      const reqObject = {
        method: "DELETE",
        body: JSON.stringify(bodyObject),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch(`/favourite`, reqObject)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // TOGGLE TRUE/ FALSE
    setIsFavouriteByUser(!isFavouriteByUser);
  };

  return (
    <div onClick={handleFavourite}>
      <StyledFavourite
        style={{ color: isFavouriteByUser ? "var(--color-underline2)" : "" }}
      />
    </div>
  );
};

const StyledFavourite = styled(AiFillStar)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 30px;
  max-height: 30px;
`;

export default FavouriteButton;
