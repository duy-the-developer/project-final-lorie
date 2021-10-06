import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLoaded: false,
  userContextData: {
    _id: "",
    email: "",
    family_name: "",
    given_name: "",
    mealPlans: [],
    favouriteMeals: [],
    settings: {
      targetDailyCalories: 2000,
      dietType: "",
      intolerances: "",
      marcroNutrients: {
        proteinPercentage: 30,
        fatPercentage: 35,
        carbsPercentage: 35,
      },
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET-USER-INFO": {
      return {
        ...state,
        isLoaded: true,
        userContextData: action.data,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserInfo = (data) => {
    dispatch({
      type: "GET-USER-INFO",
      ...data,
    });
  };

  return (
    <UserContext.Provider value={{ state, action: { getUserInfo } }}>
      {children}
    </UserContext.Provider>
  );
};
