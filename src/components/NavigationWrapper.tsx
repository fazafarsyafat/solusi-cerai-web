"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrLogin = pathname.startsWith('/admin') || pathname.startsWith('/login');

  return (
    <>
      {!isAdminOrLogin && <Navbar />}
      <main className={`flex-1 ${!isAdminOrLogin ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isAdminOrLogin && <Footer />}
    </>
  );
}
