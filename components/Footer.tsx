import React from "react";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full] bg-[#f9fafb] border-t border-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Social Media Section */}
        <div className="flex flex-col items-center mb-10">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-4">Follow Us</h3>
          <div className="flex justify-center gap-8">
            <Link
              href="#"
              className="group transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook 
                size={28} 
                className="text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all" 
                fill="currentColor" 
              />
            </Link>
            <Link
              href="#"
              className="group transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram 
                size={28} 
                className="text-gray-400 group-hover:text-pink-600 group-hover:scale-110 transition-all" 
              />
            </Link>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 ">
          {[
            "Return Refund Policy",
            "Terms & Conditions",
            "Privacy Policy",
            "About Us",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center justify-center bg-white border border-gray-200 text-gray-700 text-sm font-semibold py-4 px-6 rounded-xl shadow-sm hover:bg-[#B3589D] hover:text-white hover:border-[#B3589D] transition-all duration-300 text-center"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Payment Methods Section */}
        <div className="flex flex-col items-center mb-12">
           <span className="text-gray-400 text-xs font-medium mb-4">Secure Payment Partners</span>
           <div className="w-full max-w-lg bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex justify-center">
            <img
              src="/Payment.png" 
              alt="Payment Methods"
              className="h-8 md:h-10 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-gray-500 text-sm md:text-base text-center leading-relaxed">
              Copyright © {currentYear}{" "}
              <span className="text-gray-900 font-bold tracking-tight">
                Mother Abaya
              </span>
              . All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
               <span>Modern Modest Fashion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;