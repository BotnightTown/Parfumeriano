"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthSkeleton from "@/components/skeletons/AuthSkeleton";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setError("Неправильний email або пароль");
    else router.push("/");
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <AuthSkeleton fields={2} />;

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4 p-6 border rounded-xl">
        <h1 className="text-2xl font-semibold text-center">Вхід</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-black text-white rounded text-sm cursor-pointer"
        >
          Увійти
        </button>
        <p className="text-sm text-center">
          Немає акаунту?{" "}
          <Link href="/register" className="underline">
            Зареєструватись
          </Link>
        </p>
      </div>
    </main>
  );
}
