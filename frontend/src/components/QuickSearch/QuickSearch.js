import React, { useState } from "react";
import styled from "styled-components";

const QuickSearch = () => {
  const [calories, setCalories] = useState(2000);

  const handleCalorieInput = (e) => {
    setCalories(e.target.value);
  };

  return (
    <Wrapper>
      <StyledH1>Quick Meal Plans</StyledH1>
      <ControlsWrapper>
        <StyledInput
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleCalorieInput}
        />
        <StyledButton>Search</StyledButton>
      </ControlsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: var(--color-text);
  margin: var(--margin-page);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledH1 = styled.h1`
  display: flex;
  margin-bottom: 5vw;
`;

const ControlsWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 2vw;
`;

const StyledInput = styled.input`
  font-size: 24px;
  width: inherit;
  border-radius: 10px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  font-size: 24px;
  width: 100%;
  background-color: var(--color-midground);
  color: var(--color-text);
  border: none;
  box-sizing: border-box;
  border-radius: 10px;

  &:active {
    opacity: 0.5;
  }
`;

export default QuickSearch;
