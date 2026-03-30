import { useCurrency } from "@/context/CurrencyContext";
import { convertPrice, formatPrice } from "@/lib/product";

type Stats = {
  orderCount: number;
  totalSpent: number;
};

export default function StatsBlock({ stats }: { stats: Stats | null }) {
  const { currency } = useCurrency();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        Статистика
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="border rounded-lg p-4 flex flex-col gap-1">
          <p className="text-2xl font-bold">{stats?.orderCount ?? 0}</p>
          <p className="text-xs text-gray-500">Замовлень</p>
        </div>
        <div className="border rounded-lg p-4 flex flex-col gap-1">
          <p className="text-xl font-bold">
            {formatPrice(
              convertPrice(stats?.totalSpent ?? 0, currency),
              currency,
            )}
          </p>
          <p className="text-xs text-gray-500">Витрачено</p>
        </div>
      </div>
    </div>
  );
}
