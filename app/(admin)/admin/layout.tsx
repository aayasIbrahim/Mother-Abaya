// app/(admin)/admin/layout.tsx
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Products", icon: <ShoppingBag size={20} />, href: "/admin/products" },
    { name: "Orders", icon: <ShoppingBag size={20} />, href: "/admin/orders" },
    { name: "Users", icon: <Users size={20} />, href: "/admin/users" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-black text-[#B3589D]">MOTHER ABAYA</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#B3589D]/10 hover:text-[#B3589D] rounded-xl transition-all font-medium">
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-bold text-gray-800 text-lg">Control Center</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">Admin User</p>
              <p className="text-[10px] text-green-500 font-bold uppercase">Online</p>
            </div>
            <div className="w-10 h-10 bg-[#B3589D] rounded-full"></div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}