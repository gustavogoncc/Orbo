"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TransactionForm from "@/components/TransactionForm";
import { getTransactions, deleteTransaction } from "@/lib/transactionService";
import BalanceCard from "@/components/BalanceCard";
import TransactionTable from "@/components/TransactionTable";
import Header from "@/components/Header";

import "@/app/globals.css";

// Tipagem para Transações
interface Transaction {
  id: string;
  type: "entrada" | "saida";
  amount: number;
  date: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [entradas, setEntradas] = useState<number>(0);
  const [saidas, setSaidas] = useState<number>(0);
  const [editingTransaction, setEditingTransaction] = useState<{
    id: string;
    type: "entrada" | "saida";
    amount: number;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth/login");
      } else {
        setUser(currentUser);
        fetchTransactions();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchTransactions = async () => {
    if (!user) return;
    const data = await getTransactions();
    setTransactions(data);

    const totalEntradas = data
      .filter((t) => t.type === "entrada")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalSaidas = data
      .filter((t) => t.type === "saida")
      .reduce((acc, t) => acc + t.amount, 0);

    setEntradas(totalEntradas);
    setSaidas(totalSaidas);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta transação?");
    if (confirmDelete) {
      await deleteTransaction(id);
      fetchTransactions();
    }
  };

  const handleEdit = (id: string) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    if (transactionToEdit) {
      setEditingTransaction({
        id: transactionToEdit.id,
        type: transactionToEdit.type,
        amount: transactionToEdit.amount,
      });
    }
  };

  const clearEditing = () => {
    setEditingTransaction(null);
  };

  if (loading) return <p className="loading-message">Carregando...</p>;

  const data = [
    { name: "Entradas", valor: entradas },
    { name: "Saídas", valor: saidas },
  ];

  return (
    <>
      <Header />
      <main className="dashboard-container">
        <div className="card">
          <h1 className="dashboard-title">Orbo - Dashboard Financeiro</h1>
          <p className="dashboard-user">Bem-vindo, {user?.email}</p>
        </div>

        <section className="card">
          <h2 className="section-title">
            {editingTransaction ? "Editar Transação" : "Nova Transação"}
          </h2>
          <TransactionForm
            onTransactionAdded={fetchTransactions}
            editingTransaction={editingTransaction}
            clearEditing={clearEditing}
          />
        </section>

        <section className="card">
          <h2 className="section-title">Histórico de Transações</h2>
          <TransactionTable
            transactions={transactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>

        <section className="card">
          <h2 className="section-title">Gráfico de Entradas e Saídas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#7e3af2" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="card">
          <h2 className="section-title">Saldo Atual</h2>
          <BalanceCard entradas={entradas} saidas={saidas} saldo={entradas - saidas} />
        </section>
      </main>
    </>
  );
}
