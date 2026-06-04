"use client";

import type { Product } from "@/lib/types";
import { getCartFromStorage, saveCartToStorage } from "@/lib/cart";
import { toast } from "sonner";

export function addToCartClient(product: Product, qty = 1) {
  const cart = getCartFromStorage();
  const existing = cart.find((x) => x.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl,
      qty,
    });
  }
  saveCartToStorage(cart);
  window.dispatchEvent(new Event("revo-cart-updated"));
  toast.success(`${product.name} added to cart!`);
}

export function dispatchCartUpdate() {
  window.dispatchEvent(new Event("revo-cart-updated"));
}
