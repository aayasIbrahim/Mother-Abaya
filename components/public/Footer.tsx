import React from "react";
import Link from "next/link";
import { getStoreSettings } from "@/actions/settings.actions";
import { Facebook, Instagram, MessageCircleMore } from "lucide-react";

export default async function Footer() {
  const settings = await getStoreSettings();
  return (
    <footer className="w-full bg-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          {settings?.facebookUrl && (
            <Link
              href={
                settings.facebookUrl.startsWith("http")
                  ? settings.facebookUrl
                  : `https://${settings.facebookUrl}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 transition-all duration-300 drop-shadow-sm"
              aria-label="Visit Mother Abaya on Facebook"
            >
              <Facebook size={28} fill="currentColor" strokeWidth={0} />
            </Link>
          )}
          {settings?.instagramUrl && (
            <Link
              href={
                settings.instagramUrl.startsWith("http")
                  ? settings.instagramUrl
                  : `https://${settings.instagramUrl}`
              }
              target="_blank"
              className="text-pink-600 hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram size={32} />
            </Link>
          )}
          {settings?.whatsappNumber && (
            <Link
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              className="text-green-500 hover:scale-125 transition-all duration-300 drop-shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageCircleMore
                size={28}
                fill="currentColor"
                strokeWidth={0}
              />
            </Link>
          )}
        </div>

        {/* Action Buttons (Mobile First & Modern) */}
        <div className="flex flex-col gap-3 mb-8 max-w-7xl mx-auto">
          {[
            { label: "Return Refund Policy", href: "/return-refund-policy" },
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "About Us", href: "/about" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="w-full bg-[#B3589D] text-white text-center py-4 rounded-sm text-lg font-medium hover:bg-[#a04a8b] transition-all duration-300 shadow-sm active:scale-95"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Payment Gateways */}
        <div className="flex justify-center mb-10 max-w-3xl mx-auto">
          <div className="w-full overflow-hidden border border-gray-100 p-2 rounded-md shadow-sm bg-gray-50">
            <img
              src="/Payment.png"
              alt="Supported Payment Methods"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Copyright Section (Dynamic) */}
        <div className="border-t border-gray-100 pt-8 mt-8 text-center space-y-3">
          {/* Main Copyright Text */}
          <p className="text-gray-500 font-medium text-xs md:text-sm tracking-tight">
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-gray-900 font-black hover:text-[#B3589D] transition-colors cursor-default">
              Mother Abaya
            </span>
            . All rights reserved.
          </p>

          {/* Developer Credit - Personalized for Ayas Ibrahim */}
          <p className="text-[10px] md:text-xs text-pink-500 font-bold uppercase tracking-[0.15em]">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/ayas-ibrahim-ai77" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-[#B3589D] border-b border-transparent hover:border-[#B3589D] transition-all duration-300 pb-0.5"
            >
              Ayas Ibrahim
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
