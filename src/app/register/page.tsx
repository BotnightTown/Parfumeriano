"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthSkeleton from "@/components/skeletons/AuthSkeleton";
import Link from "next/link";
import axios from "axios";

function validate(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): string {
  if (!name.trim()) return "Ім'я не може бути порожнім";
  if (name.trim().length < 2) return "Ім'я має бути не менше 2 символів";
  if (!email.trim()) return "Email не може бути порожнім";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Невірний формат email";
  if (!password) return "Пароль не може бути порожнім";
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
      password,
    )
  )
    return "Пароль має містити мінімум 8 символів, велику та малу літеру, цифру і спецсимвол";
  if (password !== confirmPassword) return "Паролі не співпадають";
  return "";
}

export default function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    const validationError = validate(name, email, password, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/register", { name, email, password });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <AuthSkeleton fields={4} />;

  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4 p-6 border rounded-xl">
        <h1 className="text-2xl font-semibold text-center">Реєстрація</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="Ім'я та прізвище"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="border px-3 py-2 rounded text-sm"
        />
        <input
          type="password"
          placeholder="Підтвердження пароля"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          className="border px-3 py-2 rounded text-sm"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-black text-white rounded text-sm cursor-pointer"
        >
          Зареєструватись
        </button>
        <p className="text-sm text-center">
          Вже є акаунт?{" "}
          <Link href="/login" className="underline">
            Увійти
          </Link>
        </p>
      </div>
    </main>
  );
}
