// IMPORT DEPENDENCIES
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";

// IMPORT COMPONENTS
import IngredientList from "./IngredientList";
import InstructionList from "./InstructionList";
import { StyledBackIcon } from "../utils/StyledIcons";
import FavouriteButton from "./FavouriteButton";
import AddToMealPlanButton from "./AddToMealPlanButton";

// IMPORT CONTEXT
import { UserContext } from "../ContextProviders/UserContext";

const SingleRecipe = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    state: {
      userContextData: { _id, favouriteMeals, mealPlans },
    },
  } = useContext(UserContext);

  // INITIALIZE STATES
  const [recipeData, setRecipeData] = useState({
    status: "",
    data: {},
    message: "",
    isLoaded: false,
  });

  const reqObject = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // FETCH RECIPE INFO FROM SPOONACULAR API
  useEffect(() => {
    fetch(`/recipe/${id}`, reqObject)
      .then((res) => res.json())
      .then((data) => {
        setRecipeData({ ...data, isLoaded: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ONCE THE DATA IS LOADED, RENDER THE PAGE
  if (recipeData.isLoaded) {
    const {
      information: {
        imageType,
        readyInMinutes,
        servings,
        title,
        extendedIngredients,
      },
      instructions,
      nutrition: { calories, carbs, fat, protein },
    } = recipeData.data;

    const caloriesNumOnly = calories.replace("k", "");
    const carbsPercentage = Math.round(
      ((carbs.replace("g", "") * 4) / caloriesNumOnly) * 100 * 0.8
    );
    const fatPercentage = Math.round(
      ((fat.replace("g", "") * 9) / caloriesNumOnly) * 100 * 0.8
    );
    const proteinPercentage = Math.round(
      ((protein.replace("g", "") * 4) / caloriesNumOnly) * 100 * 0.8
    );

    return (
      <Wrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div onClick={() => history.goBack()}>
            <StyledBackIcon />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FavouriteButton
              recipeId={id}
              recipeData={recipeData.data}
              userId={_id}
              favouriteMeals={favouriteMeals}
            />
            <AddToMealPlanButton
              recipeId={id}
              recipeData={recipeData.data}
              userId={_id}
              mealPlans={mealPlans}
            />
          </div>
        </div>
        <StyledH1>{title}</StyledH1>
        <ContentWrapper>
          <Container style={{ paddingTop: "0" }}>
            <StyledImage
              src={`https://spoonacular.com/recipeImages/${id}-636x393.${imageType}`}
              alt={title}
            ></StyledImage>
            <InfoWrapper>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{readyInMinutes} minutes</div>
                <div>{servings} servings</div>
              </div>
              <NutritionWrapper>
                <NutritionTitles>
                  <Row>
                    <IngredientLine
                      style={{
                        background: "var(--color-highlight)",
                        color: "var(--color-background)",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        marginBottom: "10px",
                        width: "auto",
                      }}
                    >
                      {caloriesNumOnly} kCalories
                    </IngredientLine>
                  </Row>
                  <Row>
                    <IngredientLine>Protein: {protein}</IngredientLine>
                    <Bar
                      id="protein"
                      style={{
                        width: `${proteinPercentage}%`,
                      }}
                    ></Bar>
                  </Row>
                  <Row>
                    <IngredientLine>Carbs: {carbs}</IngredientLine>
                    <Bar
                      id="carbs"
                      style={{
                        width: `${carbsPercentage}%`,
                      }}
                    ></Bar>
                  </Row>

                  <Row>
                    <IngredientLine>Fat: {fat}</IngredientLine>
                    <Bar
                      id="fat"
                      style={{
                        width: `${fatPercentage}%`,
                      }}
                    ></Bar>
                  </Row>
                </NutritionTitles>
              </NutritionWrapper>
            </InfoWrapper>
          </Container>
          <Container>
            <StyledH2>Ingredients</StyledH2>
            <IngredientList ingredients={extendedIngredients} />
          </Container>
          <Container>
            <StyledH2>Instructions</StyledH2>
            <InstructionList instructions={instructions} />
          </Container>
        </ContentWrapper>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

const Wrapper = styled.div`
  color: var(--color-text);
  margin: var(--margin-page);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 40px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
`;

const StyledH1 = styled.h1`
  text-align: left;
  display: flex;
  margin: 10px 0;
  font-size: 40px;
  font-style: italic;
  z-index: 1;
`;

const StyledH2 = styled(StyledH1)`
  text-align: left;
  font-size: 30px;
  padding: 0 15px;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const Container = styled.div`
  width: 100%;
  max-width: 338px;
  border-radius: 20px;
  overflow: hidden;
  background: var(--color-midground);
  margin-top: 10px;
  padding: 10px 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
`;

const NutritionWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const NutritionTitles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  width: 100%;
`;

const IngredientLine = styled.div`
  width: 35%;
  padding: 0 0px;
  margin-right: 10px;
`;

const Bar = styled.div`
  height: 15px;
  background: var(--color-underline2);
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  /* background: tomato; */
`;

export default SingleRecipe;
