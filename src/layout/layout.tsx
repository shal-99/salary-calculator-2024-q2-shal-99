import React from "react";
import styled from "styled-components";
import { Calculator } from "../pages/calculator";
import { YourSalary } from "../pages/salary";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 130px;
`;

const LayoutSection = styled.div`
  flex: 1;
  margin: 4px;
`;

export const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <LayoutSection>
        <Calculator />
      </LayoutSection>
      <LayoutSection>
        <YourSalary />
      </LayoutSection>
    </LayoutContainer>
  );
};
