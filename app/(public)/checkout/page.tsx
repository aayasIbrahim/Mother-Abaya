import { getShippingCharges } from "@/actions/settings.actions";
import CheckoutClient from "@/components/public/CheckoutClient";

export default async function CheckoutPage() {
  const deliveryCharges = await getShippingCharges();

  return <CheckoutClient deliveryCharges={deliveryCharges} />;
}
