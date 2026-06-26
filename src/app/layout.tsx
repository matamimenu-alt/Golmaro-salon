import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LangProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Beautiva - Beauty Booking Platform Saudi Arabia | منصة بيوتيفا للجمال",
  description: "Book premium beauty services at 500+ luxury salons across Saudi Arabia. Hair, nails, makeup, skincare, bridal and more.",
  keywords: ["beauty salon Riyadh", "book beauty services Saudi Arabia", "luxury salon booking", "beautiva"],
  openGraph: {
    title: "Beautiva - Saudi Arabia's #1 Beauty Marketplace",
    description: "Book premium beauty services at top salons across Saudi Arabia",
    type: "website",
    locale: "en_US",
    siteName: "Beautiva",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-glamora-dark text-white min-h-screen`}>
        <LangProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
