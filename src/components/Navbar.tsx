"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Pengacara", href: "/pengacara" },
    { name: "Edukasi", href: "/artikel" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-1" : "bg-white/50 backdrop-blur-sm py-3"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold"
          >
            S
          </motion.div>
          <span className="text-2xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">Solusi Cerai</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-slate-600 font-medium group px-2 py-1"
            >
              <span className="relative z-10 group-hover:text-primary transition-colors">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(37,99,235,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-2.5 rounded-full font-bold transition-colors"
          >
            Konsultasi WA
          </motion.a>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-slate-900 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 font-medium text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-3 rounded-full font-bold text-center mt-4 shadow-md"
              >
                Konsultasi via WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
