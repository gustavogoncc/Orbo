"use client";

import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

interface BalanceCardProps {
  entradas: number;
  saidas: number;
  saldo: number;
}

export default function BalanceCard({ entradas, saidas, saldo }: BalanceCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {/* Entradas */}
      <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="btn-premium">Entradas</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-1">
              R$ {entradas.toFixed(2)}
            </p>
          </div>
          <ArrowUpCircle className="text-green-500 w-8 h-8" />
        </div>
      </div>

      {/* Saídas */}
      <div className="bg-white shadow-md rounded-2xl p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="btn-premium">Saídas</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-1">
              R$ {saidas.toFixed(2)}
            </p>
          </div>
          <ArrowDownCircle className="text-red-500 w-8 h-8" />
        </div>
      </div>

      {/* Saldo */}
      <div className="bg-gradient-to-br from-purple-700 to-purple-900 shadow-md rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="btn-premium">Saldo</h2>
            <p className="text-2xl font-semibold mt-1">
              R$ {saldo.toFixed(2)}
            </p>
          </div>
          <Wallet className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
