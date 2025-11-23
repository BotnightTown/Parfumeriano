import NewProduct from "@/components/NewProduct";
import { ProductType } from "@/types/ProductType";

export default function NewsPage() {
  const products: ProductType[] = [
    {
      id: 1,
      name: "Moschino Toy Boy",
      brand: "Moschino",
      description:
        "Moschino Toy Boy is a bold and playful fragrance that combines spicy, woody, and floral notes for a modern masculine scent. It embodies confidence and charm, leaving a lasting impression with its unique blend of elegance and energy.",
      images: {
        main: "/images/Product/Moschino Toy Boy.jpg",
        list: []
      },
      price: {
        normal: 150,
        sale: null
      },
      attributes: {
        type: "EDT",
        gender: "Man",
        aroma: "Woody",
        stability: "Sedium"
      }
    },
    {
      id: 2,
      name: "Gucci Bloom",
      brand: "Gucci",
      description:
        "Gucci Bloom reveals a rich floral character built around natural jasmine and tuberose, creating a smooth and immersive aroma. The fragrance feels fresh yet deep, offering a balanced expression of femininity that is both modern and timeless in its presentation.",
      images: {
        main: "/images/Product/Gucci Bloom.jpg",
        list: []
      },
      price: {
        normal: 200,
        sale: 180
      },
      attributes: {
        type: "EDP",
        gender: "Woman",
        aroma: "Floral",
        stability: "Strong"
      }
    },
    {
      id: 3,
      name: "Dior Sauvage",
      brand: "Dior",
      description:
        "Dior Sauvage delivers a clean and crisp scent shaped by citrus, pepper, and earthy accords that create a strong yet versatile profile. It provides a confident trail that feels refined and grounded, making it suitable for daily wear while maintaining a distinctive identity.",
      images: {
        main: "/images/Product/Dior Sauvage.jpg",
        list: []
      },
      price: {
        normal: 175,
        sale: null
      },
      attributes: {
        type: "EDT",
        gender: "Man",
        aroma: "Fresh",
        stability: "Long"
      }
    },
  ];

  return (
    <main className="w-full min-h-full h-max px-0 md:px-10 lg:px-20 flex flex-col md:gap-10">
      {products.map((product, i) => (
        <NewProduct 
          key={product.id} 
          reverse={i % 2 === 1} 
          product={product}
        />
      ))}
    </main>
  );
}
