import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "Mother Abaya | Exclusive Modest Fashion & Abayas",
    template: "%s | Mother Abaya"
  },
  description: "Discover premium quality abayas and modest wear at Mother Abaya. Elegant designs crafted for comfort and style.",
  keywords: ["Abaya", "Modest Fashion", "Islamic Clothing", "Mother Abaya", "Premium Abayas"],
  authors: [{ name: "Mother Abaya Team" }],
  creator: "Mother Abaya",
  openGraph: {
    title: "Mother Abaya | Elegance in Every Stitch",
    description: "Shop the latest collection of premium abayas and modest fashion.",
    url: "https://your-domain.com", // আপনার আসল ডোমেইন এখানে দিন
    siteName: "Mother Abaya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mother Abaya",
    description: "Premium Modest Wear & Abayas",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
