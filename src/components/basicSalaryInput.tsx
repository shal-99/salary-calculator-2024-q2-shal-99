import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Heading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  font-family: "Inter", sans-serif;
  margin-bottom: 8px;
`;
export const BasicSalaryInput: React.FC<{
  onChange: (value: number) => void;
  basicSalary: number;
}> = ({ onChange, basicSalary }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onChange(value);
  };

  return (
    <InputContainer>
      <Heading>Basic Salary</Heading>
      <InputField
        type="number"
        placeholder="Enter basic salary"
        value={basicSalary}
        onChange={handleChange}
      />
    </InputContainer>
  );
};
