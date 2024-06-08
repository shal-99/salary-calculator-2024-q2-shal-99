import React from "react";
import styled from "styled-components";
import { useEarningsDeductions } from "../context/earningsDeductionsContext";

const resetIcon = process.env.PUBLIC_URL + "/reset.svg";

const Button = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  color: #0052ea;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 5px;
  filter: invert(51%) sepia(54%) saturate(2617%) hue-rotate(209deg)
    brightness(99%) contrast(102%);
`;

export const ResetButton = () => {
  const { resetEarnings, resetDeductions, resetBasicSalary } =
    useEarningsDeductions();

  const handleReset = () => {
    resetEarnings();
    resetDeductions();
    resetBasicSalary();
  };

  return (
    <Button onClick={handleReset}>
      <Icon src={resetIcon} alt="Reset Icon" />
      Reset
    </Button>
  );
};
