import { auth } from "@/auth";
import {
  deleteProduct,
  getNextProductId,
  getProducts,
  upsertProduct,
} from "@/lib/data";
import type { Product } from "@/lib/types";
import { NextResponse } from "next/server";

function requireAdmin() {
  return auth().then((session) => {
    if (!session?.user || session.user.role !== "ADMIN") {
      return null;
    }
    return session;
  });
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getProducts());
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<Product> & { isNew?: boolean };

  const product: Product = {
    id: body.isNew ? getNextProductId() : (body.id ?? getNextProductId()),
    slug: body.slug ?? `product-${Date.now()}`,
    name: body.name ?? "",
    category: body.category ?? "Uncategorized",
    description: body.description ?? "",
    specs: body.specs ?? {},
    features: body.features ?? [],
    price: Number(body.price) || 0,
    originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
    stock: Number(body.stock) || 0,
    rating: Number(body.rating) || 4.5,
    reviews: Number(body.reviews) || 0,
    imageUrl: body.imageUrl ?? "/images/products/placeholder.svg",
    featured: Boolean(body.featured),
    badge: body.badge ?? null,
  };

  upsertProduct(product);
  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const ok = deleteProduct(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
