import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Glamora - Beauty Booking Platform Saudi Arabia | منصة الجمال في السعودية",
  description: "Book premium beauty services at 500+ luxury salons across Saudi Arabia. Hair, nails, makeup, skincare, bridal and more.",
  keywords: ["beauty salon Riyadh", "book beauty services Saudi Arabia", "luxury salon booking", "glamora"],
  openGraph: {
    title: "Glamora - Saudi Arabia's #1 Beauty Marketplace",
    description: "Book premium beauty services at top salons across Saudi Arabia",
    type: "website",
    locale: "en_US",
    siteName: "Glamora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glamora Beauty Marketplace",
    description: "Book beauty services at 500+ salons in Saudi Arabia",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-glamora-dark text-white min-h-screen`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
