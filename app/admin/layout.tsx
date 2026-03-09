"use client";
import AdminProfile from "@/components/admin/AdminProfile";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
  {
    name: "Products",
    icon: <ShoppingBag size={20} />,
    href: "/admin/products",
  },
  { name: "Orders", icon: <ShoppingBag size={20} />, href: "/admin/orders" },
  { name: "Users", icon: <Users size={20} />, href: "/admin/users" },
  { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#FDF7FB]">
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar (Mobile & Desktop) --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out 
          md:relative md:translate-x-0 flex flex-col h-full
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-[#B3589D] tracking-tighter">
                MOTHER ABAYA
              </h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                Management Space
              </p>
            </div>
            <button
              className="md:hidden text-gray-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-semibold group
                    ${
                      isActive
                        ? "bg-[#B3589D] text-white shadow-lg shadow-pink-200"
                        : "text-gray-500 hover:bg-[#B3589D]/5 hover:text-[#B3589D]"
                    }
                  `}
                >
                  <span
                    className={`${isActive ? "text-white" : "group-hover:text-[#B3589D]"}`}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="p-6 border-t border-gray-50">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-4 px-5 py-4 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold group"
            >
              <LogOut
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="hidden sm:block font-extrabold text-gray-800 text-xl tracking-tight">
              {menuItems.find((item) => item.href === pathname)?.name ||
                "Dashboard"}
            </h2>
          </div>
      
          <AdminProfile session={session} />
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
