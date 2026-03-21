"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthSkeleton from "@/components/skeletons/AuthSkeleton";
import { Order } from "@/types/OrderType";

type UserData = {
  Name: string;
  Email: string;
  role: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
          const userRes = await axios.get<UserData>("/api/user");
          setUser(userRes.data);
          setNewName(userRes.data.Name);
          const orderRes = await axios.get<Order[]>("/api/orders");
          setOrders(orderRes.data);
        } catch (error) {
          console.error("Помилка при отриманні історії замовлень:", error);
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
      <div className="w-full max-w-md flex flex-col gap-3 p-6 border rounded-xl">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Ім'я</p>
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
          <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
          <p className="text-xl font-medium">{user?.Email}</p>
        </div>
        {user?.role == "admin" && (
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

        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Історія замовлень
          </p>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-400">Замовлень ще немає</p>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div
                  key={order.OrderId}
                  className="border rounded-lg p-4 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">
                      Замовлення #{order.OrderId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.OrderDate).toLocaleDateString("uk-UA")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {order.OrderItems.map((item) => (
                      <div
                        key={item.OrderItemId}
                        className="flex justify-between items-center text-sm"
                      >
                        <div className="flex items-center gap-2">
                          {item.Products.ImageMain && (
                            <img
                              src={item.Products.ImageMain}
                              alt={item.Products.Name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          )}
                          <span>{item.Products.Name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-right">
                          <span className="text-gray-500">
                            x{item.Quantity}
                          </span>
                          <span className="font-medium">
                            {(
                              (item.Products.SalePrice ??
                                item.Products.NormalPrice) * item.Quantity
                            ).toFixed(2)}
                            $
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                    <span>Всього:</span>
                    <span>
                      {order.OrderItems.reduce(
                        (sum, item) =>
                          sum +
                          (item.Products.SalePrice ??
                            item.Products.NormalPrice) *
                            item.Quantity,
                        0,
                      ).toFixed(2)}
                      $
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full py-2 border border-black text-sm rounded cursor-pointer hover:bg-black hover:text-white transition-colors"
        >
          Вийти з акаунту
        </button>
      </div>
    </main>
  );
}
