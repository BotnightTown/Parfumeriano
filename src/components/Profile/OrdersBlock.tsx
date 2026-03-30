import { useCurrency } from "@/context/CurrencyContext";
import { convertPrice, formatPrice } from "@/lib/product";
import { Order } from "@/types/OrderType";

export default function OrdersBlock({ orders }: { orders: Order[] }) {
  const { currency } = useCurrency();

  return (
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
                      <span className="text-gray-500">x{item.Quantity}</span>
                      <span className="font-medium">
                        {formatPrice(
                          convertPrice(
                            (item.Products.SalePrice ??
                              item.Products.NormalPrice) * item.Quantity,
                            currency,
                          ),
                          currency,
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                <span>Всього:</span>
                <span>
                  {formatPrice(
                    convertPrice(
                      order.OrderItems.reduce(
                        (sum, item) =>
                          sum +
                          (item.Products.SalePrice ??
                            item.Products.NormalPrice) *
                            item.Quantity,
                        0,
                      ),
                      currency,
                    ),
                    currency,
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
