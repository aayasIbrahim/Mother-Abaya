import { Providers } from "@/provider/provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          {" "}
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
                border: "1px solid #B3589D20", 
                boxShadow: "0 10px 25px -5px rgba(179, 88, 157, 0.15)", 
              },
              success: {
                iconTheme: {
                  primary: "#B3589D", 
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
