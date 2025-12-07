import products from '@/data/products.json';

interface filterProps{
  brand?: string,
  onlySale?: boolean,
  isNew?: boolean,
  gender? : string
}

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export function filterList({brand, onlySale, isNew, gender}: filterProps){

  const filteredProducts = products.filter(product => {
    const brandMatch = brand === 'all' || product.brand === brand;
    const saleMatch = !onlySale || product.price.sale !== null;
    const dateMatch = !isNew || product.year > 2016;
    const genderMatch = gender === "Unisex" || product.attributes.gender === gender
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