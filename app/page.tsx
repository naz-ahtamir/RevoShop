import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/data";
import { categories, testimonials } from "@/lib/constants";
import { fmtRp } from "@/lib/format";
import { Trophy, Truck, DollarSign, Handshake, LucideIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const products = getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const heroPreview = products.filter((p) => p.featured).slice(0, 3);
  const features: [LucideIcon, string, string][] = [
  [Trophy, "Certified Products", "All products meet SNI, ISO, and ANSI safety standards."],
  [Truck, "Fast Delivery", "Same-day dispatch for orders before 2PM nationwide."],
  [DollarSign, "Competitive Pricing", "Factory-direct pricing with volume discounts."],
  [Handshake, "Trusted Supplier", "Preferred vendor for 2,400+ corporations."],
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--gray-200)] bg-white">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[var(--orange)] opacity-[0.06]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[var(--orange)] opacity-[0.04]" />
        <div className="container-page relative py-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <div className="h-0.5 w-8 bg-[var(--orange)]" />
                <span className="subheading">Trusted Industrial Supplier</span>
              </div>
              <h1 className="font-[family-name:var(--font-montserrat)] text-5xl font-extrabold uppercase leading-none tracking-tight text-[var(--black)] md:text-7xl">
                Protecting
                <br />
                Your
                <br />
                <span className="text-[var(--orange)]">Workforce</span>
                <br />
                Starts Here
              </h1>
              <p className="mt-6 max-w-md text-base text-[var(--black)]">
                Complete range of certified PPE & industrial safety equipment for manufacturing,
                construction, mining, and logistics industries across Indonesia.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary btn-lg">
                  Shop Now
                </Link>
                <Link href="/products" className="btn btn-secondary btn-lg">
                  View Catalog
                </Link>
              </div>
              <div className="mt-12 flex gap-8">
                {[
                  ["500+", "Products Available"],
                  ["2,400+", "Corporate Clients"],
                  ["99.2%", "On-time Delivery"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-[var(--black)]">
                      {num}
                    </div>
                    <div className="text-xs text-[var(--black)]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {heroPreview.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--gray-200)] bg-[var(--orange-pale)] p-5 transition-all hover:border-[var(--orange)] hover:translate-x-1"
                >
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-white">
                    <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-semibold text-[var(--black)]">{p.name}</div>
                    <div className="text-xs text-[var(--black)]">{p.category}</div>
                    <div className="font-[family-name:var(--font-montserrat)] text-lg font-bold text-[var(--orange)]">
                      {fmtRp(p.price)}
                    </div>
                  </div>
                  {p.badge && <span className="badge badge-orange shrink-0">{p.badge}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--gray-50)] py-16">
        <div className="container-page">
          <div className="mb-12 text-center">
            <p className="subheading">Browse By Category</p>
            <h2 className="display-md mt-2 text-[var(--black)]">Safety Equipment Categories</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.name).length;
              return (
                <Link
                  key={c.name}
                  href={`/products?category=${encodeURIComponent(c.name)}`}
                  className="rounded-2xl border-[1.5px] border-[var(--gray-200)] bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--orange)] hover:shadow-lg"
                >
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--gray-100)]">
                    <c.Icon className="h-11 w-11 text-[var(--orange)]" />   {/* ✅ pakai JSX */}
                  </div>
                  <div className="text-sm font-bold text-[var(--black)]">{c.name}</div>
                  <div className="mt-1 text-xs text-[var(--black)]">{count} Products</div>
                </Link>
              );
            })}

          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="mb-12 text-center">
            <p className="subheading">Why RevoShop</p>
            <h2 className="display-md mt-2 text-[var(--black)]">The Industrial Safety Partner You Can Trust</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(([Icon, title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border-[1.5px] border-[var(--gray-200)] bg-white p-8 text-center transition-all hover:-translate-y-1 hover:border-[var(--orange)]">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--orange-pale)]">
                <Icon className="h-11 w-11 text-[var(--orange)]" />
              </div>
              <h3 className="mb-2 font-bold text-[var(--black)]">{title}</h3>
              <p className="text-sm text-[var(--gray-600)]">{desc}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="subheading">Top Picks</p>
              <h2 className="display-md mt-2 text-[var(--black)]">Featured Products</h2>
            </div>
            <Link href="/products" className="btn btn-outline">
              View All Products →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--orange)]/20 bg-[var(--orange-pale)] py-16">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="badge badge-orange mb-4">Limited Time Offer</span>
            <h2 className="font-[family-name:var(--font-montserrat)] text-4xl font-extrabold uppercase text-[var(--black)]">
              Up to <span className="text-[var(--orange)]">40% Off</span>
              <br />
              Corporate Packages
            </h2>
            <p className="mt-4 text-[var(--black)]">
              Bulk purchasing discounts for companies with 50+ employees.
            </p>
            <Link href="/promo" className="btn btn-primary btn-lg mt-6 inline-flex">
              View All Promos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["40%", "Bulk Order (50+ units)"],
              ["25%", "Corporate Package"],
              ["FREE", "Shipping > Rp500K"],
              ["12%", "New Member Discount"],
            ].map(([pct, label]) => (
              <div key={label} className="rounded-xl border border-[var(--orange)]/30 bg-white p-5">
                <div className="font-[family-name:var(--font-montserrat)] text-3xl font-extrabold text-[var(--orange)]">
                  {pct}
                </div>
                <div className="mt-1 text-sm text-[var(--black)]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--gray-50)] py-16">
        <div className="container-page">
          <div className="mb-12 text-center">
            <p className="subheading">Testimonials</p>
            <h2 className="display-md mt-2 text-[var(--black)]">What Our Clients Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border-[1.5px] border-[var(--gray-200)] text-center bg-white p-7">                              
                <p className="mb-5 text-sm italic text-[var(--black)]"> <span className="text-[var(--orange)] text-sm font-bold">&ldquo;</span>{t.text} <span className="text-[var(--orange)] font-bold text-sm">&rdquo;</span></p>                
                <div className="flex items-center gap-3 justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--orange)] text-sm font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--black)]">{t.name}</div>
                    <div className="text-xs text-[var(--black)]">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
