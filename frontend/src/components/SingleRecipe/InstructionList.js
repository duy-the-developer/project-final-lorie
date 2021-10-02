import React from "react";
import styled from "styled-components";

const InstructionList = ({ instructions }) => {
  return (
    <Wrapper>
      {instructions.map((instruction) => {
        const { number, step } = instruction;
        return (
          <InstructionWrapper>{`${number}. ${step}`}</InstructionWrapper>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;
  row-gap: 10px;
`;

const InstructionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
`;

export default InstructionList;
