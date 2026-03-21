export type OrderItem = {
  OrderItemId: number;
  Quantity: number;
  Products: {
    ProductId: number;
    Name: string;
    NormalPrice: number;
    SalePrice: number | null;
    ImageMain: string | null;
  };
};

export type Order = {
  OrderId: number;
  OrderDate: string;
  OrderItems: OrderItem[];
};
