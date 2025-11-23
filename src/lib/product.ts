import products from '@/data/products.json';

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};
