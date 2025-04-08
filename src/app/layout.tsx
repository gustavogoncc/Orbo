import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Gerencie suas finanças de forma prática e eficiente.",
};

// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-background min-h-screen">
        {children}
      </body>
    </html>
  );
}

