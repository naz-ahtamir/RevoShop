"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { fmtRp } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { addToCartClient } from "@/components/cart-actions";

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const [qty, setQty] = useState(1);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container-page py-10">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--gray-200)] bg-[var(--gray-50)]">
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-8" priority />
          </div>
        </div>
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="badge badge-orange">{product.category}</span>
            {product.badge && <span className="badge badge-gray">{product.badge}</span>}
            {discount > 0 && <span className="badge badge-red">{discount}% OFF</span>}
          </div>
          <h1 className="text-3xl font-bold text-[var(--black)]">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#f59e0b]">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-sm text-[var(--black)]">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
          <div className="mt-6">
            <div className="font-[family-name:var(--font-montserrat)] text-4xl font-bold text-[var(--black)]">
              {fmtRp(product.price)}
            </div>
            {product.originalPrice && (
              <div className="mt-1 flex gap-2 text-sm">
                <span className="text-[var(--gray-500)] line-through">{fmtRp(product.originalPrice)}</span>
                <span className="text-[var(--orange)]">
                  Save {fmtRp(product.originalPrice - product.price)}
                </span>
              </div>
            )}
          </div>
          <p className="mt-2 text-sm text-[var(--black)]">
            <strong>{product.stock} units</strong> in stock
          </p>
          <p className="mt-6 text-[var(--black)]">{product.description}</p>
          <div className="mt-6 rounded-xl border border-[var(--gray-200)]">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-[var(--gray-100)] px-4 py-2.5 text-sm last:border-0">
                <span className="text-[var(--black)]">{k}</span>
                <span className="font-medium text-[var(--black)]">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="mb-2 text-sm font-bold text-[var(--black)]">KEY FEATURES</div>
            {product.features.map((f) => (
              <div key={f} className="mb-1.5 flex gap-2 text-sm text-[var(--black)]">
                <span className="text-[var(--orange)]">✓</span>
                {f}
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold text-[var(--black)]">Quantity:</span>
            <div className="flex items-center rounded-lg border border-[var(--gray-200)]">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-2 text-lg hover:bg-[var(--orange-pale)]"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2 text-lg hover:bg-[var(--orange-pale)]"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCartClient(product, qty)}
              className="btn btn-primary btn-lg"
            >
              Add to Cart
            </button>
            <Link
              href="/cart"
              onClick={() => addToCartClient(product, qty)}
              className="btn btn-secondary btn-lg"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="display-md mb-8 text-[var(--black)]">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
