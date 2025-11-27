import NewProduct from "@/components/NewProduct";
import { ProductType } from "@/types/ProductType";

export default function NewsPage() {
  const products: ProductType[] = [
  {
    "id": 1,
    "name": "Moschino Toy Boy",
    "brand": "Moschino",
    "year": 2019,
    "description": "Moschino Toy Boy is a bold and playful fragrance that combines Spicy, Woody, and Floral notes for a modern masculine scent. It embodies confidence and charm, leaving a lasting impression with its unique blend of elegance and energy.",
    "capacity": [50, 100, 250],
    "images": {
      "main": "/images/Product/Moschino Toy Boy.jpg",
      "list": [
        "/images/Product/Moschino Toy Boy-1.jpg",
        "/images/Product/Moschino Toy Boy-2.jpg",
        "/images/Product/Moschino Toy Boy-3.jpg",
        "/images/Product/Moschino Toy Boy-4.jpg"
      ]
    },
    "price": {
      "normal": 150,
      "sale": null
    },
    "attributes": {
      "type": "Eau de Toilette",
      "gender": "Man",
      "aroma": "Woody",
      "stability": "Medium",
      "classification": "масова"
    }
  },
  {
    "id": 5,
    "name": "Dior Sauvage",
    "brand": "Dior",
    "year": 2015,
    "description": "Dior Sauvage delivers a clean and crisp scent shaped by Citrus, Pepper, and Earthy accords that create a strong yet versatile profile. It provides a confident trail that feels refined and grounded.",
    "capacity": [60, 100, 200],
    "images": {
      "main": "/images/Product/Dior Sauvage.jpg",
      "list": [
        "/images/Product/Dior Sauvage-1.jpg",
        "/images/Product/Dior Sauvage-2.jpg",
        "/images/Product/Dior Sauvage-3.jpg",
        "/images/Product/Dior Sauvage-4.jpg"
      ]
    },
    "price": {
      "normal": 175,
      "sale": null
    },
    "attributes": {
      "type": "Eau de Toilette",
      "gender": "Man",
      "aroma": "Fresh",
      "stability": "Long",
      "classification": "елітна"
    }
  },
  {
    "id": 3,
    "name": "Gucci Bloom",
    "brand": "Gucci",
    "year": 2017,
    "description": "Gucci Bloom reveals a rich Floral character built around natural Jasmine and Tuberose, creating a smooth and immersive aroma. The fragrance feels fresh yet deep, offering a balanced expression of femininity that is both modern and timeless.",
    "capacity": [30, 50, 100],
    "images": {
      "main": "/images/Product/Gucci Bloom.jpg",
      "list": [
        "/images/Product/Gucci Bloom-1.jpg",
        "/images/Product/Gucci Bloom-2.jpg",
        "/images/Product/Gucci Bloom-3.jpg",
        "/images/Product/Gucci Bloom-4.jpg"
      ]
    },
    "price": {
      "normal": 200,
      "sale": 180
    },
    "attributes": {
      "type": "Eau de Parfum",
      "gender": "Woman",
      "aroma": "Floral",
      "stability": "Strong",
      "classification": "елітна"
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
