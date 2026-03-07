import React from "react";
import PageHero from "@/components/public/PageHero";
import { getShippingCharges } from "@/libs/actions/settings";
import CartContent from "@/components/public/CartContent";

export default async function CartPage() {
  const shippingRates = await getShippingCharges();

  return (
    <div className="min-h-screen bg-[#FDF7FB]">
      <PageHero title="Cart" />

  
        <CartContent shippingRates={shippingRates} />
      </div>
  
  );
}
