import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/providers";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "RevoShop – Industrial Safety Equipment",
  description: "Certified PPE & industrial safety equipment across Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${montserrat.variable} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
