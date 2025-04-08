"use client";

import { useEffect, useState } from "react";
import { addTransaction, updateTransaction } from "@/lib/transactionService";

interface Props {
  onTransactionAdded: () => void;
  editingTransaction?: {
    id: string;
    type: "entrada" | "saida";
    amount: number;
  };
  clearEditing?: () => void;
}

export default function TransactionForm({ onTransactionAdded, editingTransaction, clearEditing }: Props) {
  const [type, setType] = useState<"entrada" | "saida">("entrada");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount.toString());
    }
  }, [editingTransaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return alert("Informe um valor!");

    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, {
        type,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      });
    } else {
      await addTransaction({
        type,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      });
    }

    onTransactionAdded();
    setAmount("");
    setType("entrada");
    if (clearEditing) clearEditing();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="section-title">
        {editingTransaction ? "Editar Transação" : "Nova Transação"}
      </h2>

      <label>Tipo:</label>
      <select value={type} onChange={(e) => setType(e.target.value as "entrada" | "saida")}>
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <label>Valor:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="R$ 0,00"
      />

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button type="submit" className="btn-premium">
          {editingTransaction ? "Atualizar" : "Adicionar"}
        </button>
        {editingTransaction && (
          <button type="button" className="btn-secondary" onClick={clearEditing}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
