import { Suspense } from "react";
import { getProducts } from "@/lib/data";
import { ProductsListing } from "@/components/ProductsListing";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  const products = getProducts();
  return (
    <Suspense fallback={<div className="container-page py-20 text-center">Loading...</div>}>
      <ProductsListing products={products} />
    </Suspense>
  );
}
