"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, LogOut, Shield } from "lucide-react";
import { logout } from "@/lib/auth"; // We need a client-side logout action or server action
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // Call server action or API to logout
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const menu = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Artikel", href: "/admin/artikel", icon: FileText },
    { name: "Advokat", href: "/admin/advokat", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Shield className="text-primary mr-2" size={24} />
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">Admin Area</span>
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-blue-500/20" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:hidden">
          <div className="flex items-center">
            <Shield className="text-primary mr-2" size={24} />
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">Admin Area</span>
          </div>
          <button onClick={handleLogout} className="text-red-600 p-2">
            <LogOut size={24} />
          </button>
        </header>
        
        {/* Mobile Nav (Simple horizontal scrolling for small screens) */}
        <div className="bg-white border-b border-slate-200 flex md:hidden overflow-x-auto">
          {menu.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm border-b-2 ${
                  isActive ? "border-primary text-primary" : "border-transparent text-slate-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
