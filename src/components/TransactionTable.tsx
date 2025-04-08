"use client";

import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  type: "entrada" | "saida";
  amount: number;
  date: string;
}

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function TransactionTable({ transactions, onDelete, onEdit }: Props) {
  const [filter, setFilter] = useState<"todas" | "entrada" | "saida">("todas");

  const filteredTransactions =
    filter === "todas"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const total = filteredTransactions.reduce((acc, t) => {
    return t.type === "entrada" ? acc + t.amount : acc - t.amount;
  }, 0);

  return (
    <div className="mt-6 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-purple-800">Histórico de Transações</h2>

        <div className="flex gap-2">
          {["todas", "entrada", "saida"].map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFilter(filtro as any)}
              className={`filter-btn ${filter === filtro ? "active" : ""}`}
            >
              {filtro === "todas"
                ? "Todas"
                : filtro === "entrada"
                ? "Entradas"
                : "Saídas"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-purple-100 text-purple-800">
            <tr>
              <th className="px-6 py-3">Valor</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Horário</th>
              <th className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-white border-b border-gray-100 hover:bg-purple-50 transition"
                >
                  <td
                    className={`px-6 py-4 font-semibold ${
                      transaction.type === "entrada"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    R$ {transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.type === "entrada"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type === "entrada" ? "Entrada" : "Saída"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(transaction.date).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit?.(transaction.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                  Nenhuma transação cadastrada com este filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right text-lg font-semibold text-purple-800">
        Saldo:{" "}
        <span className={total >= 0 ? "text-green-600" : "text-red-600"}>
          R$ {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
