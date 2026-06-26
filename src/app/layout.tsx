import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glamora - Luxury Beauty Marketplace | سوق الجمال الفاخر",
  description: "Book premium beauty services at top salons across Saudi Arabia. Hair, nails, makeup, skincare and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-glamora-dark text-white min-h-screen`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
