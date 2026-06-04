import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/data";
import { ProductDetail } from "@/components/ProductDetail";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
