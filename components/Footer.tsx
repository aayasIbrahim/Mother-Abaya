import React from "react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        
        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <Link
            href="#"
            className="text-blue-600 hover:scale-110 transition-transform"
            aria-label="Facebook"
          >
            <Facebook size={32} fill="currentColor" />
          </Link>
          <Link
            href="#"
            className="text-pink-600 hover:scale-110 transition-transform"
            aria-label="Instagram"
          >
            <Instagram size={32} />
          </Link>
        </div>

        {/* Action Buttons (Mobile First & Modern) */}
        <div className="flex flex-col gap-3 mb-8 max-w-7xl mx-auto">
          {[
            "Return Refund Policy",
            "Terms & Conditions",
            "Privacy Policy",
            "About Us",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="w-full bg-[#B3589D] text-white text-center py-4 rounded-sm text-lg font-medium hover:bg-[#a04a8b] transition-all duration-300 shadow-sm active:scale-95"
            >
              {item}
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
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600 font-medium text-sm md:text-base tracking-tight">
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-gray-900 font-bold hover:text-[#B3589D] transition-colors cursor-default">
              Mother Abaya
            </span>
            . All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;