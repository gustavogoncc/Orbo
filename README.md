# 💸 Orbo - Dashboard Financeiro Inteligente

**Orbo** é uma plataforma moderna e intuitiva para controle financeiro pessoal. Com um design elegante e responsivo, permite ao usuário registrar ganhos e gastos, visualizar gráficos e acompanhar o saldo mensal em tempo real.

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuário com autenticação via Firebase
- ✅ Cadastro de transações (entradas e saídas)
- ✅ Edição e exclusão de transações
- ✅ Visualização de gráfico de entradas e saídas
- ✅ Saldo do mês atualizado automaticamente
- ✅ Filtros de transações por tipo
- ✅ Interface estilizada com visual premium (baseada em PDF de design)
- ✅ Proteção de rotas (usuário precisa estar autenticado)
- ✅ Responsivo para dispositivos móveis

---

## 🧪 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Auth + Firestore](https://firebase.google.com/)
- [Recharts](https://recharts.org/en-US/) para gráficos
- CSS puro (sem Tailwind)
- Deploy-ready para Vercel ou Firebase Hosting

---

## 📂 Estrutura de pastas

src/ ├── app/
             │ ├── auth/ (login, register, logout) 
             │ ├── dashboard/ (página principal do painel) 
             │ └── layout.tsx / page.tsx 
             ├── components/ │
              ├── Header.tsx │ 
              ├── TransactionForm.tsx │
              ├── TransactionTable.tsx │ 
              └── BalanceCard.tsx 
              ├── lib/ 
              │ ├── firebaseConfig.ts │
                └── transactionService.ts 
              ├── app/globals.css


👤 Autor
Desenvolvido por Gustavo Gonçalves
Entre em contato: gugagoncc@gmail.com | Linkedin: GustavoGoncc

