"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Orbo</h1>

        <nav className="header-nav">
          <Link href="/dashboard" className="header-link">
            Início
          </Link>

          <Link href="/auth/logout" className="logout-link">
            <LogOut className="w-4 h-4" />
            Sair
          </Link>
        </nav>
      </div>
    </header>
  );
}
