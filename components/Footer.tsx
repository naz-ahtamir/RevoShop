"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-[var(--gray-200)] bg-[var(--orange-pale)]">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-[var(--orange)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-montserrat)] text-lg font-extrabold uppercase">
                REVO<span className="text-[var(--orange)]">SHOP</span>
              </span>
            </div>
            <p className="text-sm text-[var(--black)]">
              Indonesia&apos;s trusted industrial safety equipment supplier. Certified PPE for manufacturing,
              construction, mining, and logistics.
            </p>
          </div>
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--black)]">Quick Links</div>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-[var(--black)] hover:text-[var(--orange)]">Home</Link>
              <Link href="/products" className="text-sm text-[var(--black)] hover:text-[var(--orange)]">All Products</Link>
              <Link href="/promo" className="text-sm text-[var(--black)] hover:text-[var(--orange)]">Promotions</Link>
              <Link href="/faq" className="text-sm text-[var(--black)] hover:text-[var(--orange)]">FAQ</Link>
            </div>
          </div>
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--black)]">Categories</div>
            <div className="flex flex-col gap-2">
              {["Safety Helmet", "Safety Shoes", "Safety Gloves", "Respirator"].map((c) => (
                <Link
                  key={c}
                  href={`/products?category=${encodeURIComponent(c)}`}
                  className="text-sm text-[var(--black)] hover:text-[var(--orange)]"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--black)]">Contact</div>
            <div className="space-y-2 text-sm text-[var(--black)]">
              <p>Jl. Keselamatan No. 1, Indonesia</p>               
              <p>0822-2071-5073</p>
              <p>Mon-Sat : 08:00 – 17:00 WITA</p>
              <a href="https://www.naz-ahtamir.site/"><p className="font-bold">www.naz-ahtamir.site</p></a>              
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--orange)]/20">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <p className="text-xs text-[var(--black)]">© 2026 RevoShop. <a href="https://www.naz-ahtamir.site/"
            ><span className="text-[var(--orange)] font-bold">naz-ahtamir</span></a></p>
          <div className="flex gap-2">
            {["SNI", "ISO 9001", "OHSAS"].map((c) => (
              <span key={c} className="badge badge-orange text-[10px]">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
