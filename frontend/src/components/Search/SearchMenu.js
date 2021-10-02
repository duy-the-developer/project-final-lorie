// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { mealTypes } from "../utils/cuisinesData";

const SearchMenu = () => {
  return (
    <Wrapper>
      <StyledNavLink to="/search/quick-search" exact>
        <StyledH1>Quick meal plans</StyledH1>
      </StyledNavLink>
      <Underline />
      {mealTypes.map((meal) => {
        return (
          <>
            <StyledNavLink
              to={`/search/custom-search/${meal.toLowerCase()}`}
              exact
            >
              <StyledH1>{meal}</StyledH1>
            </StyledNavLink>
            <Underline />
          </>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-text);
  margin: var(--margin-page);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 10px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  z-index: 100;

  font-style: italic;
  &.current {
    color: var(--color-underline2);
    border-bottom: 5px solid var(--color-underline2);
  }
`;

const StyledH1 = styled.h1`
  font-size: 40px;
  text-align: left;
`;

const Underline = styled.div`
  margin-top: -20px;
  border-top: 10px solid var(--color-underline2);
  z-index: 0;
`;

export default SearchMenu;
