import { db } from "@/lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Adicionar uma transação ao Firestore
export async function addTransaction(transaction: {
  type: string;
  amount: number;
  date: string;
}) {
  try {
    const docRef = await addDoc(collection(db, "transactions"), transaction);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar transação:", error);
  }
}

// Buscar todas as transações do Firestore
export async function getTransactions() {
  try {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as { id: string; type: string; amount: number; date: string }[];
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
}

// Excluir uma transação do Firestore
export async function deleteTransaction(transactionId: string) {
  try {
    await deleteDoc(doc(db, "transactions", transactionId));
  } catch (error) {
    console.error("Erro ao excluir transação:", error);
  }
}

// ✅ Atualizar uma transação no Firestore
export async function updateTransaction(
  transactionId: string,
  updatedData: { type: string; amount: number; date: string }
) {
  try {
    const transactionRef = doc(db, "transactions", transactionId);
    await updateDoc(transactionRef, updatedData);
    console.log("Transação atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
  }
}
