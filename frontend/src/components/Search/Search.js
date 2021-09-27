import React from "react";
import styled from "styled-components";

const Search = () => {
  return (
    <Wrapper>
      <StyledH1>Explore Meal Plans</StyledH1>
      <div>
        <StyledInput type="number" placeholder="Calories (e.g. 2000)"/>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-text);
  padding: var(--padding-page);
  display: flex;
  flex-direction: column;
`;

const StyledH1 = styled.h1`
  display: flex;
`;

const StyledInput = styled.input``;

export default Search;
