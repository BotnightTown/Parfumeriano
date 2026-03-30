"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthSkeleton from "@/components/skeletons/AuthSkeleton";
import { Order } from "@/types/OrderType";
import OrdersBlock from "@/components/Profile/OrdersBlock";
import StatsBlock from "@/components/Profile/StatsBlock";

type UserData = {
  Name: string;
  Email: string;
  role: string;
};

type Stats = {
  orderCount: number;
  totalSpent: number;
};

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const [userRes, ordersRes, statsRes] = await Promise.all([
            axios.get<UserData>("/api/user"),
            axios.get<Order[]>("/api/orders"),
            axios.get<Stats>("/api/user/stats"),
          ]);
          setUser(userRes.data);
          setNewName(userRes.data.Name);
          setOrders(ordersRes.data);
          setStats(statsRes.data);
        } catch (error) {
          console.error("Помилка при отриманні даних:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [status]);

  async function handleSaveName() {
    if (!newName.trim()) {
      setError("Ім'я не може бути порожнім");
      return;
    }
    try {
      const { data } = await axios.put<UserData>("/api/user", {
        name: newName,
      });
      setUser(data);
      setNewName(data.Name);
      setIsEditing(false);
      setSuccess("Ім'я успішно оновлено");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Щось пішло не так");
    }
  }

  if (loading || status === "loading") return <AuthSkeleton fields={3} />;

  return (
    <main className="flex-1 w-full px-6 md:px-10 lg:px-20 py-10 flex flex-col gap-8">
      <h1 className="text-2xl md:text-3xl font-semibold">Профіль</h1>

      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:max-w-sm flex flex-col gap-3 p-6 border rounded-xl">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Ім'я
            </p>
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    setError("");
                  }}
                  className="border px-3 py-2 rounded text-sm"
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveName}
                    className="px-4 py-1.5 bg-black text-white text-sm rounded cursor-pointer"
                  >
                    Зберегти
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNewName(user?.Name ?? "");
                      setError("");
                    }}
                    className="px-4 py-1.5 border text-sm rounded cursor-pointer"
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium">{user?.Name}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-gray-500 underline cursor-pointer"
                >
                  Редагувати
                </button>
              </div>
            )}
            {success && <p className="text-green-600 text-xs">{success}</p>}
          </div>

          <div className="w-full border-t border-gray-400" />

          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Email
            </p>
            <p className="text-xl font-medium">{user?.Email}</p>
          </div>

          {user?.role === "admin" && (
            <>
              <div className="w-full border-t border-gray-400" />
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Роль
                </p>
                <p className="text-xl font-medium capitalize">{user?.role}</p>
              </div>
            </>
          )}

          <div className="w-full border-t border-gray-400" />

          <StatsBlock stats={stats} />

          <div className="w-full border-t border-gray-400" />

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full py-2 border border-black text-sm rounded cursor-pointer hover:bg-black hover:text-white transition-colors"
          >
            Вийти з акаунту
          </button>
        </div>

        <div className="w-full flex flex-col gap-3 p-6 border rounded-xl">
          <OrdersBlock orders={orders} />
        </div>
      </div>
    </main>
  );
}
