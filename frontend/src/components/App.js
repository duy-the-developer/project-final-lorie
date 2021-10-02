// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import QuickSearch from "./Search/QuickSearch";
import GlobalStyles from "./utils/GlobalStyles";
import LoginPush from "./utils/LoginPush";
import CustomSearch from "./Search/CustomSearch";
import SearchMenu from "./Search/SearchMenu";
import SingleRecipe from "./SingleRecipe/SingleRecipe";

const App = () => {
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
            <Route exact path="/search/recipe/:id">
              <SingleRecipe />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile">
              <Profile />
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
