"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TopBanner from "./Topbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white font-sans relative">
      <TopBanner />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 md:h-24 items-center justify-between">
          
          {/* Mobile: Hamburger Menu (Left) */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsOpen(true)}
              className="text-gray-800 p-1"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* Logo Section (Center on Mobile, Left on Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex flex-col items-center flex-shrink-0">
            <Link href="/" className="group transition-transform duration-300 active:scale-95">
              <div className="flex items-center justify-center space-x-[-8px] md:space-x-[-10px] scale-[0.85] md:scale-100">
                <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-pink-100 flex items-center justify-center border border-pink-200 text-xs font-bold text-black">M</div>
                <div className="z-10 h-11 w-11 md:h-12 md:w-12 rounded-full border-2 border-pink-300 bg-white p-1 shadow-sm">
                  <img src="/mother.jpg" alt="Logo" className="h-full w-full rounded-full object-cover" />
                </div>
                <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-pink-200 flex items-center justify-center border border-pink-300 text-xs text-black font-bold">A</div>
              </div>
              <span className="mt-0.5 block text-black text-center font-serif text-base md:text-xl font-semibold tracking-tighter">
                Mother Abaya
              </span>
            </Link>
          </div>

          {/* Desktop Links & Right Icons */}
          <div className="flex items-center space-x-3 md:space-x-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
              <Link href="/terms" className="hover:text-pink-500 transition-colors">Terms & Conditions</Link>
              <Link href="/about" className="hover:text-pink-500 transition-colors">About Us</Link>
              <Link href="/contact-us" className="hover:text-pink-500 transition-colors">Contact Us</Link>
            </div>

            {/* Icons (Mobile: Only Cart, Desktop: All) */}
            <div className="flex items-center space-x-4 md:space-x-5 text-gray-800">
              <button className="hidden md:block hover:text-pink-500"><Search size={22} /></button>
              <Link href="/login" className="hidden md:block hover:text-pink-500"><User size={22} /></Link>
              
              <Link href="/cart" className="relative group p-1">
                <ShoppingCart size={24} strokeWidth={1.5} className="md:size-[22px]" />
                <span className="absolute -right-1 -top-1 md:-right-2 md:-top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white border-2 border-white">
                  4
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* --- Mobile Sidebar Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Background Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar Menu */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-[70] w-[80%] max-w-sm bg-[#C9A9C3] shadow-2xl md:hidden flex flex-col"
            >
              {/* Sidebar Header with Search */}
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between mb-6">
                   <div className="relative flex-1 mr-4">
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full bg-white/90 px-4 py-2 rounded-md text-sm outline-none"
                      />
                      <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
                   </div>
                   <button onClick={() => setIsOpen(false)} className="text-white">
                      <X size={28} />
                   </button>
                </div>
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-col text-white font-medium">
                <Link href="/terms" onClick={()=>setIsOpen(false)} className="px-6 py-4 border-b border-white/10 hover:bg-white/10 transition-colors">Terms & Conditions</Link>
                <Link href="/about" onClick={()=>setIsOpen(false)} className="px-6 py-4 border-b border-white/10 hover:bg-white/10 transition-colors">About Us</Link>
                <Link href="/contact-us" onClick={()=>setIsOpen(false)} className="px-6 py-4 border-b border-white/10 hover:bg-white/10 transition-colors">Contact Us</Link>
                <Link href="/login" onClick={()=>setIsOpen(false)} className="px-6 py-4 hover:bg-white/10 transition-colors">Login / Register</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;