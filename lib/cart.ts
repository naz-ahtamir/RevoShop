import type { CartItem } from "./types";

export const CART_STORAGE_KEY = "revo_cart";

export function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((s, i) => s + i.qty, 0);
}
