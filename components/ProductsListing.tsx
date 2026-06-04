"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

interface ProductsListingProps {
  products: Product[];
}

export function ProductsListing({ products }: ProductsListingProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const initialSearch = searchParams.get("q") ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState("default");
  const [instockOnly, setInstockOnly] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );

  const allCategories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategories.length) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (instockOnly) list = list.filter((p) => p.stock > 0);
    const min = parseFloat(priceMin) || 0;
    const max = parseFloat(priceMax) || Infinity;
    if (min > 0) list = list.filter((p) => p.price >= min);
    if (max < Infinity) list = list.filter((p) => p.price <= max);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, selectedCategories, search, instockOnly, priceMin, priceMax, sort]);

  const toggleCat = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <p className="subheading">Catalog</p>
        <h1 className="display-md mt-2 text-[var(--black)]">All Products</h1>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <div className="rounded-2xl border border-[var(--gray-200)] bg-white p-5">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 w-full rounded-lg border border-[var(--gray-200)] px-3 py-2 text-sm text-[var(--black)] outline-none focus:border-[var(--orange)]"
            />
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--black)]">
              Categories
            </div>
            {allCategories.map((c) => (
              <label key={c} className="mb-2 flex cursor-pointer items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[var(--black)]">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(c)}
                    onChange={() => toggleCat(c)}
                    className="accent-[var(--orange)]"
                  />
                  {c}
                </span>
                <span className="text-xs text-[var(--gray-500)]">
                  {products.filter((p) => p.category === c).length}
                </span>
              </label>
            ))}
            <div className="mt-4 mb-2 text-xs font-bold uppercase text-[var(--black)]">Price Range</div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full rounded border px-2 py-1.5 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full rounded border px-2 py-1.5 text-sm"
              />
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm text-[var(--black)]">
              <input
                type="checkbox"
                checked={instockOnly}
                onChange={(e) => setInstockOnly(e.target.checked)}
                className="accent-[var(--orange)]"
              />
              In stock only
            </label>
            <button
              type="button"
              onClick={() => {
                setSelectedCategories([]);
                setSearch("");
                setPriceMin("");
                setPriceMax("");
                setInstockOnly(false);
                setSort("default");
              }}
              className="mt-4 text-sm text-[var(--orange)] hover:underline"
            >
              Reset filters
            </button>
          </div>
        </aside>
        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm text-[var(--black)]">
              Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-[var(--gray-200)] px-3 py-2 text-sm text-[var(--black)]"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
          {filtered.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-[var(--black)]">
              <div className="text-5xl mb-4">🔍</div>
              <div className="font-semibold">No products found</div>
              <p className="mt-2 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
