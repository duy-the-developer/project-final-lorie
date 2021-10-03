import React from "react";
import { BsBookmarkFill } from "react-icons/bs";
import styled from "styled-components";

const AddToMealPlanButton = () => {
  return (
    <div>
      <StyledBookMark />
      {/* <div style={{ position: "absolute", right: "100px" }}>Meal Plan 1</div>
      <div style={{ position: "absolute" }}>Meal Plan 2</div>
      <div style={{ position: "absolute" }}>Meal Plan 3</div> */}
    </div>
  );
};

const StyledBookMark = styled(BsBookmarkFill)`
  height: var(--icon-size);
  width: var(--icon-size);
  max-width: 25px;
  max-height: 25px;
`;

export default AddToMealPlanButton;
