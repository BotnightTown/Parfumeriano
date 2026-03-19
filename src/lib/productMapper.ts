import { Products, ProductCapacities, Capacities } from "@/generated/prisma";
import { ProductType } from "@/types/ProductType";

type ProductWithCapacities = Products & {
  ProductCapacities: (ProductCapacities & {
    Capacities: Capacities;
  })[];
};

export function mapProduct(p: ProductWithCapacities): ProductType {
  return {
    id: p.ProductId,
    name: p.Name,
    brand: p.Brand,
    year: p.Year,
    description: p.Description,
    capacity: p.ProductCapacities.map((pc) => pc.Capacities.Value),
    images: {
      main: p.ImageMain ?? "",
      list: p.ImageList ? JSON.parse(p.ImageList) : [],
    },
    price: {
      normal: Number(p.NormalPrice),
      sale: p.SalePrice ? Number(p.SalePrice) : null,
    },
    attributes: {
      type: p.AttrType ?? undefined,
      gender: p.AttrGender ?? undefined,
      aroma: p.AttrAroma ?? undefined,
      stability: p.AttrStability ?? undefined,
      classification: p.AttrClass ?? undefined,
    },
  };
}
