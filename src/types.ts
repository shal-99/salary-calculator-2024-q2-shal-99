export type Expense = {
  id: number;
  name: string;
  amount: number;
  epfEtf: boolean;
};

export interface Props {
  expense: Expense[];
  edit?: (id: number, name: string, amount: number, epfEtf: boolean) => void;
  delete?: (id: number) => void;
  add?: (name: string, amount: number, epfEtf: boolean) => void;
}

export interface EarningsDeductionsContextProps {
  earnings: Expense[];
  deductions: Expense[];
  basicSalary: number;
  addEarnings: (name: string, amount: number, epfEtf: boolean) => void;
  editEarnings: (
    id: number,
    name: string,
    amount: number,
    epfEtf: boolean
  ) => void;
  deleteEarnings: (id: number) => void;
  addDeductions: (name: string, amount: number, epfEtf: boolean) => void;
  editDeductions: (
    id: number,
    name: string,
    amount: number,
    epfEtf: boolean
  ) => void;
  deleteDeductions: (id: number) => void;
  resetEarnings: () => void;
  resetDeductions: () => void;
  addBasicSalary: (salary: number) => void;
  resetBasicSalary: () => void;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, amount: number, epfEtf: boolean) => void;
  expense?: Expense;
  type: "allowance" | "deduction";
}
