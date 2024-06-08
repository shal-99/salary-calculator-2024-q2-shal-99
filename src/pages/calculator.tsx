import React, { useState } from "react";
import styled from "styled-components";
import { ResetButton } from "../components/resetButton";
import { AddDelete } from "../components/addDelete";
import { useEarningsDeductions } from "../context/earningsDeductionsContext";
import { BasicSalaryInput } from "../components/basicSalaryInput";
import { Modal } from "../components/modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
  padding: 0 16px;
  background: #fafafa;
  width: 680px;
  height: 616px;
`;

const Section = styled.div`
  margin: 4px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BasicSalaryWrapper = styled.div`
  width: 50%;
`;

const Heading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  font-family: "Inter", sans-serif;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  font-family: "Inter", sans-serif;
  color: #757575;
  margin-bottom: 8px;
`;

export const Calculator: React.FC = () => {
  const {
    earnings,
    deductions,
    addEarnings,
    editEarnings,
    deleteEarnings,
    addDeductions,
    editDeductions,
    deleteDeductions,
    addBasicSalary,
    basicSalary,
  } = useEarningsDeductions();

  const [isEarningsModalOpen, setIsEarningsModalOpen] = useState(false);
  const [isDeductionsModalOpen, setIsDeductionsModalOpen] = useState(false);

  const handleBasicSalaryChange = (value: number) => {
    addBasicSalary(value);
  };

  return (
    <>
      <Container>
        <Section>
          <Header>
            <Heading>Calculate Your Salary</Heading>
            <ResetButton />
          </Header>
          <BasicSalaryWrapper>
            <BasicSalaryInput
              basicSalary={basicSalary}
              onChange={handleBasicSalaryChange}
            />
          </BasicSalaryWrapper>
          <Heading>Earnings</Heading>
          <Description>Allowance, Fixed Allowance, Bonus and etc.</Description>
          <AddDelete
            expense={earnings}
            edit={editEarnings}
            delete={deleteEarnings}
            add={() => setIsEarningsModalOpen(true)}
            type="allowance"
          />
          <hr />
          <Heading>Deduction</Heading>
          <Description>Salary Advances, Loan Deductions and all</Description>
          <AddDelete
            expense={deductions}
            edit={editDeductions}
            delete={deleteDeductions}
            add={() => setIsDeductionsModalOpen(true)}
            type="deduction"
          />
        </Section>
      </Container>
      <Modal
        isOpen={isEarningsModalOpen}
        onClose={() => setIsEarningsModalOpen(false)}
        onSave={addEarnings}
        type="allowance"
      />
      <Modal
        isOpen={isDeductionsModalOpen}
        onClose={() => setIsDeductionsModalOpen(false)}
        onSave={addDeductions}
        type="deduction"
      />
    </>
  );
};
