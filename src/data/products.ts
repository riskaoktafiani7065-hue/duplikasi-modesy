
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Casual Shirt",
    category: "Clothing",
    price: 150000,
  },
  {
    id: 2,
    name: "Stylish Shoes",
    category: "Shoes",
    price: 250000,
  },
  {
    id: 3,
    name: "Fashion Accessories",
    category: "Jewelry & Accessories",
    price: 100000,
  },
];
