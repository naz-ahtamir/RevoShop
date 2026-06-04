import { getProducts } from "@/lib/data";
import { ProductAdminClient } from "@/components/admin/ProductAdminClient";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = getProducts();
  return <ProductAdminClient initialProducts={products} />;
}
