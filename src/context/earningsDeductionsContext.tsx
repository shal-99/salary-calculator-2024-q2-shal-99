import React, { createContext, useContext, useState } from "react";
import { EarningsDeductionsContextProps, Expense } from "../types";

const EarningsDeductionsContext = createContext<
  EarningsDeductionsContextProps | undefined
>(undefined);

export const EarningsDeductionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [earnings, setEarnings] = useState<Expense[]>([]);
  const [deductions, setDeductions] = useState<Expense[]>([]);
  const [basicSalary, setBasicSalary] = useState<number>(0);

  const addBasicSalary = (salary: number) => {
    setBasicSalary(salary);
    console.log("set basic salary", salary);
  };

  const addEarnings = (name: string, amount: number, epfEtf: boolean) => {
    const newEarnings = {
      id: Math.floor(Math.random() * 100000000),
      name,
      amount,
      epfEtf,
    };
    setEarnings([...earnings, newEarnings]);
    console.log("set earnings - new earnings", newEarnings);
  };
  console.log("earnings state", earnings);

  const editEarnings = (
    id: number,
    name: string,
    amount: number,
    epfEtf: boolean
  ) => {
    const updatedEarnings = earnings.map((item) =>
      item.id === id ? { ...item, name, amount, epfEtf } : item
    );
    setEarnings(updatedEarnings);
  };

  const deleteEarnings = (id: number) => {
    const updatedEarnings = earnings.filter((item) => item.id !== id);
    setEarnings(updatedEarnings);
  };

  const addDeductions = (name: string, amount: number, epfEtf: boolean) => {
    const newDeductions = { id: deductions.length, name, amount, epfEtf };
    setDeductions([...deductions, newDeductions]);
  };

  const editDeductions = (
    id: number,
    name: string,
    amount: number,
    epfEtf: boolean
  ) => {
    const updatedDeductions = deductions.map((item) =>
      item.id === id ? { ...item, name, amount, epfEtf } : item
    );
    setDeductions(updatedDeductions);
  };

  const deleteDeductions = (id: number) => {
    const updatedDeductions = deductions.filter((item) => item.id !== id);
    setDeductions(updatedDeductions);
  };

  const resetEarnings = () => {
    setEarnings([]);
  };

  const resetDeductions = () => {
    setDeductions([]);
  };
  const resetBasicSalary = () => {
    setBasicSalary(0);
  };

  return (
    <EarningsDeductionsContext.Provider
      value={{
        earnings,
        deductions,
        basicSalary,
        addEarnings,
        editEarnings,
        deleteEarnings,
        addDeductions,
        editDeductions,
        deleteDeductions,
        resetEarnings,
        resetDeductions,
        addBasicSalary,
        resetBasicSalary,
      }}
    >
      {children}
    </EarningsDeductionsContext.Provider>
  );
};

export const useEarningsDeductions = () => {
  const context = useContext(EarningsDeductionsContext);
  if (context === undefined) {
    throw new Error(
      "useEarningsDeductions must be used within an EarningsDeductionsProvider"
    );
  }
  return context;
};
