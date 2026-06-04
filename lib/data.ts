import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Order, Product, StoreSettings, User } from "./types";

const DATA_DIR = join(process.cwd(), "data");

function readJson<T>(filename: string): T {
  const raw = readFileSync(join(DATA_DIR, filename), "utf-8");
  return JSON.parse(raw) as T;
}

function writeJson<T>(filename: string, data: T): void {
  writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
}

export function getProducts(): Product[] {
  return readJson<Product[]>("products.json");
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function saveProducts(products: Product[]): void {
  writeJson("products.json", products);
}

export function upsertProduct(product: Product): Product {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.push(product);
  }
  saveProducts(products);
  return product;
}

export function deleteProduct(id: number): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

export function getNextProductId(): number {
  const products = getProducts();
  return products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
}

export function getUsers(): User[] {
  return readJson<User[]>("users.json");
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function saveUsers(users: User[]): void {
  writeJson("users.json", users);
}

export function createUser(user: Omit<User, "id"> & { id?: string }): User {
  const users = getUsers();
  const id = user.id ?? String(Math.max(0, ...users.map((u) => parseInt(u.id, 10) || 0)) + 1);
  const newUser: User = { ...user, id } as User;
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function getOrders(): Order[] {
  return readJson<Order[]>("orders.json");
}

export function getSettings(): StoreSettings {
  return readJson<StoreSettings>("settings.json");
}

export function saveSettings(settings: StoreSettings): void {
  writeJson("settings.json", settings);
}

export { categories, testimonials, faqs } from "./constants";
