// IMPORT DEPENDENCIES
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// IMPORT COMPONENTS
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import QuickSearch from "./Search/QuickSearch";
import GlobalStyles from "./utils/GlobalStyles";
import LoginPush from "./utils/LoginPush";
import CustomSearch from "./Search/CustomSearch";
import Bookmark from "./Bookmark/Bookmark";
import SearchMenu from "./Search/SearchMenu";
import SingleRecipe from "./SingleRecipe/SingleRecipe";
import ProfileSetup from "./Profile/ProfileSetup";

// IMPORT CONTEXT
import { UserContext } from "./ContextProviders/UserContext";
import SingleMealPlan from "./Bookmark/SingleMealPlan";

const App = () => {
  // GET DATA FROM AUTH0
  const { user, isAuthenticated } = useAuth0();

  // DESTRUCTURE USER CONTEXT VARIABLES
  const {
    state: { isLoaded, userContextData },
    action: { getUserInfo },
  } = useContext(UserContext);

  // FETCH USER DATA FROM MONGODB IF USER IS AUTHENTICATED
  useEffect(() => {
    if (isAuthenticated) {
      // GET UNIQUE SUB STRING FROM AUTH0 USER OBJECT
      const { sub } = user;
      console.log(sub);

      // INITATE REQUEST OBJECT
      const reqObject = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      // FETCH BE API END POINT /user/:sub
      fetch(`/user/${sub}`, reqObject)
        .then((res) => res.json())
        .then((parsedData) => {
          console.log(parsedData);
          getUserInfo(parsedData);
        })
        .catch((error) => console.log(error));
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Main>
          <LoginPush />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/search">
              <SearchMenu />
            </Route>
            <Route exact path="/search/quick-search">
              <QuickSearch />
            </Route>
            <Route exact path="/search/custom-search/:type">
              <CustomSearch />
            </Route>
            <Route exact path="/bookmark">
              <Bookmark />
            </Route>
            <Route exact path="/bookmark/:planIndex/:planId">
              <SingleMealPlan />
            </Route>
            <Route exact path="/search/recipe/:id">
              <SingleRecipe />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/profile/setup">
              <ProfileSetup />
            </Route>
          </Switch>
        </Main>
        <NavBar />
      </Wrapper>
    </BrowserRouter>
  );
};

const Main = styled.div`
  height: 100%;
  width: 100vw;
`;

const Wrapper = styled.div`
  background: var(--color-background);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-body);
`;

export default App;
