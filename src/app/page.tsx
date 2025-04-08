"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard"); // Se estiver logado, vai para o Dashboard
      } else {
        router.push("/auth/register"); // Se não estiver logado, vai para o Cadastro
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <p>Carregando...</p>;
}
