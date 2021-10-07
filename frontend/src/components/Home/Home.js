import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import Header from "../Header/Header";
import MealCard from "../MealList/MealCard";

import { StyledFavouriteIcon } from "../utils/StyledIcons";

import { UserContext } from "../ContextProviders/UserContext";

const Home = () => {
  const [suggestedRecipes, setSuggestedRecipes] = useState(false);
  const {
    state: {
      isLoaded,
      userContextData: { favouriteMeals },
    },
  } = useContext(UserContext);

  useEffect(() => {
    const reqObject = {
      method: "POST",
      body: JSON.stringify({ favouriteMeals: favouriteMeals }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch(`/suggestion`, reqObject)
      .then((res) => res.json())
      .then((parsedData) => {
        console.log(parsedData);
        setSuggestedRecipes(parsedData.data);
      })
      .catch((error) => console.log(error));
  }, [isLoaded]);

  return (
    <Wrapper>
      <Header />
      <Body>
        <Section>
          <SectionHeading>
            <Icon>
              <StyledFavouriteIcon />
            </Icon>
            <SectionTitle>
              <span>Recipe Suggestions</span>
              <span style={{ fontSize: "12px", color: "grey" }}>
                Explore recipes similar to your favourites
              </span>
            </SectionTitle>
          </SectionHeading>
        </Section>

        <Section>
          {suggestedRecipes &&
            suggestedRecipes.map((meal) => {
              const {
                id,
                imageType,
                readyInMinutes,
                servings,
                sourceUrl,
                title,
              } = meal;

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
        </Section>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: var(--margin-page);
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 40px;
  color: var(--color-text);
  padding-bottom: 70px;
`;

const Body = styled.div`
  justify-content: center;
  flex-wrap: wrap;
  max-width: 340px;
  row-gap: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const SectionHeading = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

const Icon = styled.div`
  width: 45px;
  aspect-ratio: 1/1;
  background-color: var(--color-underline2);
  border-radius: 10px;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const SectionBody = styled.div`
  padding: 15px 15px;
  background: var(--color-midground);
  border-radius: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 3px;
  border-bottom: 1px solid grey;
  padding: 10px 0;
  min-height: 40px;

  &:nth-child(1) {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }
`;

export default Home;
