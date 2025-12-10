import products1 from '@/data/products.json';
import { RootState } from '@/store/store';
import { ProductType } from '@/types/ProductType';
import { useSelector } from 'react-redux';

interface filterProps{
  brand?: string,
  onlySale?: boolean,
  isNew?: boolean,
  gender? : string
}

export const getProductById = (id: number, products: ProductType[]) => {
  return products.find(product => product.id === id);
};

export function useFilterList({brand, onlySale, isNew, gender}: filterProps){
  const products = useSelector((s: RootState) => s.adminProducts.products);
  
  const filteredProducts = products.filter((product: ProductType) => {

    
    const brandMatch = brand === 'all' || product.brand === brand;
    const saleMatch = !onlySale || product.price.sale !== null;
    const dateMatch = !isNew || product.year > 2016;
    const genderMatch = gender === "Unisex" || product.attributes?.gender === gender
    return brandMatch && saleMatch && dateMatch && genderMatch
  })

  return filteredProducts;
}

export function formatPrice(value:number, currency: string) {
  
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const exchangeRates: Record<string, number> = {
  "UAH": 42.21,
  "USD": 1,
  "EUR": 0.86,
};

export function convertPrice(price: number, currency: string): number{
  const rate = exchangeRates[currency]
  if(!rate){
    return price;
  }
  return price * rate;
}