import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Expense, ModalProps } from "../types";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  position: relative;
  width: 540px;
  height: 384px;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  padding: 20px;
  border-radius: 0 0 4px 4px;
  margin-top: 90px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #0052ea;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  margin-left: 10px;
  padding: 10px 16px;
  font-family: "Inter", sans-serif;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  margin-left: 10px;
  padding: 10px 16px;
  font-family: "Inter", sans-serif;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #000;
`;

const HR = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  expense,
  type,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [epfEtf, setEpfEtf] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expense) {
      setName(expense.name);
      setAmount(expense.amount);
      setEpfEtf(expense.epfEtf);
    } else {
      setName("");
      setAmount("");
      setEpfEtf(false);
    }
  }, [expense, isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    console.log("handlesave", name, amount, epfEtf);
    onSave(name, Number(amount), epfEtf);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent ref={modalRef}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>
          {expense
            ? "Edit"
            : `Add New ${type === "allowance" ? "Allowance" : "Deduction"}`}
        </Title>
        <HR />
        <Title>
          {type === "allowance" ? "Earnings Name" : "Deduction name"}
        </Title>
        <Input
          type="text"
          placeholder="Eg: Travel"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Title>Amount</Title>
        <Input
          type="number"
          placeholder="Eg: 10,000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}>
          <Checkbox
            checked={epfEtf}
            onChange={(e) => setEpfEtf(e.target.checked)}
          />
          <label>EPF/ETF</label>
        </div>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <AddButton onClick={handleSave}>{expense ? "Save" : "Add"}</AddButton>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};
