import Navbar from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { getStoreSettings } from "@/actions/settings.actions";
import CartDrawer from "@/components/public/cartDrawer";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getStoreSettings();
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar settings={settings}/>
        {children}
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
