
import  connectDB  from "@/libs/db";
import StoreSettings from "@/models/Settings";
import CheckoutClient from "@/components/public/CheckoutForm";

export default async function CheckoutPage() {
  await connectDB();
  const settings = await StoreSettings.findOne({}).lean();

  const deliveryCharges = {
    insideDhaka: settings?.insideDhaka || 80,
    outsideDhaka: settings?.outsideDhaka || 150,
  };

  return <CheckoutClient deliveryCharges={deliveryCharges} />;
}
