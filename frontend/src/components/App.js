// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Search from "./Search/Search";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile/:profileId">
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
  height: 100vh;
  width: 100vw;
  background: var(--color-background);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-body);
`;

export default App;
