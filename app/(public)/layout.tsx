import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { Toaster } from "react-hot-toast";
import CartDrawer from "@/components/public/cartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Mother Abaya | Exclusive Modest Fashion & Abayas",
    template: "%s | Mother Abaya",
  },
  description:
    "Discover premium quality abayas and modest wear at Mother Abaya. Elegant designs crafted for comfort and style.",
  keywords: [
    "Abaya",
    "Modest Fashion",
    "Islamic Clothing",
    "Mother Abaya",
    "Premium Abayas",
  ],
  authors: [{ name: "Mother Abaya Team" }],
  creator: "Mother Abaya",
  openGraph: {
    title: "Mother Abaya | Elegance in Every Stitch",
    description:
      "Shop the latest collection of premium abayas and modest fashion.",
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

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <CartDrawer />
        <Footer />
        {/* ✅ Toast Container */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 1500,
            style: {
              // কার্ডের মূল ডিজাইন
              background: "#ffffff",
              color: "#4A4A4A",
              borderRadius: "20px",
              padding: "16px 24px",
              fontSize: "15px",
              fontWeight: "500",
              border: "1px solid #B3589D20", // হালকা ব্র্যান্ড কালার বর্ডার
              boxShadow: "0 10px 25px -5px rgba(179, 88, 157, 0.15)", // সফট ব্র্যান্ডেড শ্যাডো
            },
            success: {
              iconTheme: {
                primary: "#B3589D", // সাকসেস আইকন আপনার ব্র্যান্ড কালার
                secondary: "#fff",
              },
              style: {
                borderLeft: "6px solid #B3589D", 
              },
            },
            error: {
              iconTheme: {
                primary: "#ff4b4b",
                secondary: "#fff",
              },
              style: {
                borderLeft: "6px solid #ff4b4b",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
