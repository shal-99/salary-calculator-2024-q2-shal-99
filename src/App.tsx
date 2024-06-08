// App.tsx
import React from "react";
import { EarningsDeductionsProvider } from "./context/earningsDeductionsContext";
import { Layout } from "./layout/layout";

const App: React.FC = () => {
  return (
    <EarningsDeductionsProvider>
      <Layout />
    </EarningsDeductionsProvider>
  );
};

export default App;
