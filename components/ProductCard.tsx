"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { fmtRp } from "@/lib/format";
import { addToCartClient } from "@/components/cart-actions";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group rounded-2xl border border-[var(--gray-200)] bg-white p-5 transition-all hover:border-[var(--orange)] hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--gray-50)]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.featured && <span className="badge badge-orange">Featured</span>}
            {discount > 0 && <span className="badge badge-red">{discount}% OFF</span>}
          </div>
        </div>
        <div className="mt-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--orange)]">
            {product.category}
          </span>
          <h3 className="mt-1.5 font-semibold text-[var(--black)] line-clamp-2">{product.name}</h3>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#f59e0b]">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-xs text-[var(--black)]">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="font-[family-name:var(--font-montserrat)] text-xl font-bold text-[var(--black)]">
                {fmtRp(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-[var(--gray-500)] line-through">{fmtRp(product.originalPrice)}</div>
              )}
            </div>
            <div className="text-xs font-semibold text-[var(--black)]">
              {product.stock} in stock
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => addToCartClient(product, 1)}
        className="btn btn-primary btn-sm mt-4 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
