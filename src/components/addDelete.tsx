import React, { useState } from "react";
import styled from "styled-components";
import { Expense, Props } from "../types";
import { Modal } from "./modal";

const editIcon = process.env.PUBLIC_URL + "/edit.svg";
const clearIcon = process.env.PUBLIC_URL + "/clear.svg";

const Button = styled.button`
  padding: 5px;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const EditButton = styled(Button)`
  color: #007bff;
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const DeleteButton = styled(Button)`
  color: #dc3545;
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const AddNewButton = styled(Button)`
  padding: 5px 10px;
  margin: 5px;
  height: 40px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #0052ea;
  border: none;
  background-color: transparent;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #000000;
`;

interface AddDeleteProps extends Props {
  type: "allowance" | "deduction";
}

export const AddDelete: React.FC<AddDeleteProps> = ({
  expense,
  edit,
  delete: deleteExpense,
  add,
  type,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | undefined>();

  const handleEdit = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const handleSave = (name: string, amount: number, epfEtf: boolean) => {
    if (currentExpense) {
      edit && edit(currentExpense.id, name, amount, epfEtf);
    } else {
      add && add(name, amount, epfEtf);
    }
    setCurrentExpense(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
      {expense.map((data) => (
        <ItemContainer key={data.id}>
          <Item>
            {data.name} : {data.amount}
          </Item>
          <div>
            <EditButton onClick={() => handleEdit(data)}>
              <img src={editIcon} alt="Edit" />
            </EditButton>
            <DeleteButton
              onClick={() => deleteExpense && deleteExpense(data.id)}
            >
              <img src={clearIcon} alt="Edit" />
            </DeleteButton>
          </div>
        </ItemContainer>
      ))}
      <AddNewButton onClick={() => setIsModalOpen(true)}>
        + Add New {type === "allowance" ? "Allowance" : "Deduction"}
      </AddNewButton>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        expense={currentExpense}
        type={type}
      />
    </div>
  );
};
