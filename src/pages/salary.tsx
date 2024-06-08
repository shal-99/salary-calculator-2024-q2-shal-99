import React, { useMemo } from "react";
import styled from "styled-components";
import { useEarningsDeductions } from "../context/earningsDeductionsContext";

const SalaryContainer = styled.div`
  width: 480px;
  height: 576px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
  opacity: 1;
  font-family: "Inter", sans-serif;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.022px;
  text-align: left;
  font-family: "Inter", sans-serif;
  color: #757575;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.div`
  flex: 1;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${(props) => props.color || "#000"};
  font-family: "Inter", sans-serif;

  &:last-child {
    text-align: right;
  }
`;

const Amount = styled.div`
  flex: 1;
  text-align: right;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: ${(props) => props.color || "#000"};
  font-family: "Inter", sans-serif;
`;

const BoldText = styled.div`
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 96%;
  margin-right: 10px;
`;

const TextLarge = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: ${(props) => props.color || "#000"};
  font-family: "Inter", sans-serif;
`;

const TextLargeSemibold = styled(TextLarge)`
  font-weight: 600;
  letter-spacing: -0.1px;
`;

const Heading = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  font-family: "Inter", sans-serif;
`;

export const YourSalary: React.FC = () => {
  const { basicSalary, earnings, deductions } = useEarningsDeductions();

  const calculations = useMemo(() => {
    const totalEarnings =
      basicSalary + earnings.reduce((acc, earning) => acc + earning.amount, 0);
    const totalEarningsForEPF =
      basicSalary +
      earnings.reduce(
        (acc, earning) => acc + (earning.epfEtf ? earning.amount : 0),
        0
      );
    const grossDeduction = deductions.reduce(
      (acc, deduction) => acc + deduction.amount,
      0
    );
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const employeeEPF = grossSalaryForEPF * 0.08;
    const employerEPF = grossSalaryForEPF * 0.12;
    const employerETF = grossSalaryForEPF * 0.03;
    const apit = basicSalary ? grossEarnings * 0.18 - 25500 : 0;
    const netSalary = grossEarnings - employeeEPF - apit;
    const costToCompany = grossEarnings + employerEPF + employerETF;

    return {
      totalEarnings,
      totalEarningsForEPF,
      grossDeduction,
      grossEarnings,
      grossSalaryForEPF,
      employeeEPF,
      employerEPF,
      employerETF,
      apit,
      netSalary,
      costToCompany,
    };
  }, [basicSalary, earnings, deductions]);

  return (
    <SalaryContainer>
      <Heading style={{ color: "#333" }}>Your Salary</Heading>
      <Row>
        <SectionTitle color="#757575">Items</SectionTitle>
        <SectionTitle color="#757575">Amount</SectionTitle>
      </Row>
      <Row>
        <Label>Basic Salary</Label>
        <Amount>{basicSalary.toFixed(2)}</Amount>
      </Row>

      <Row>
        <Label>Gross Earnings</Label>
        <Amount>{calculations.grossEarnings.toFixed(2)}</Amount>
      </Row>
      <Row>
        <Label>Gross Deduction</Label>
        <Amount>{calculations.grossDeduction.toFixed(2)}</Amount>
      </Row>

      <Row>
        <Label>Employee EPF (8%)</Label>
        <Amount>{calculations.employeeEPF.toFixed(2)}</Amount>
      </Row>
      <Row>
        <Label>APIT</Label>
        <Amount>{calculations.apit.toFixed(2)}</Amount>
      </Row>
      <BoldText>
        <Row>
          <Label style={{ fontWeight: "bold" }}>Net Salary (Take Home):</Label>
          <Amount style={{ fontWeight: "bold" }} color="#333">
            {calculations.netSalary.toFixed(2)}
          </Amount>
        </Row>
      </BoldText>
      <SectionTitle>Contribution from the Employer</SectionTitle>
      <Row>
        <Label>Employer EPF (12%)</Label>
        <Amount>{calculations.employerEPF.toFixed(2)}</Amount>
      </Row>
      <Row>
        <Label>Employer ETF (3%)</Label>
        <Amount>{calculations.employerETF.toFixed(2)}</Amount>
      </Row>
      <br />
      <Row>
        <Label>CTC (Cost to Company)</Label>
        <Amount>{calculations.costToCompany.toFixed(2)}</Amount>
      </Row>
    </SalaryContainer>
  );
};

export default YourSalary;
