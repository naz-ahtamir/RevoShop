export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
}

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  specs: ProductSpecs;
  features: string[];
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  featured: boolean;
  badge: string | null;
}

export interface Order {
  id: string;
  customer: string;
  product: string;
  qty: number;
  total: number;
  status: "Delivered" | "Processing" | "Shipped" | "Pending";
  date: string;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  taxRate: string;
  defaultShipping: string;
}

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  qty: number;
}
