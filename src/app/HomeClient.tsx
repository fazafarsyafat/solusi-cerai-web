"use client";

import Link from "next/link";
import { ArrowRight, Scale, Users, Shield, MessageCircle, HeartHandshake, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// --- Advanced Animation Variants ---
const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const textRevealChild = {
  hidden: { opacity: 0, y: 30, rotateX: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 }
  }
};

const bentoHover1 = {
  hover: { scale: 1.03, rotate: -2, y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } },
  tap: { scale: 0.95, rotate: 0 }
};

const bentoHover2 = {
  hover: { scale: 1.03, rotate: 2, y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } },
  tap: { scale: 0.95, rotate: 0 }
};

const bentoHover3 = {
  hover: { scale: 1.03, rotate: -3, y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } },
  tap: { scale: 0.95, rotate: 0 }
};

const bentoHover4 = {
  hover: { scale: 1.03, rotate: 3, y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } },
  tap: { scale: 0.95, rotate: 0 }
};

export default function HomeClient({ articles, lawyers }: { articles: any[], lawyers: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-secondary/20 font-sans overflow-hidden">
      
      {/* 1. ULTRA MODERN HERO - CALMING LIGHT THEME */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        {/* Dynamic Abstract Background (Soft Blue/Green) */}
        <motion.div 
          animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute inset-0 z-0 opacity-60"
        >
          <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/20 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-emerald-400/20 blur-[100px]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...springTransition }}
            className="mb-8 px-6 py-2 rounded-full border border-blue-100 bg-white/80 backdrop-blur-md flex items-center gap-3 shadow-[0_8px_30px_rgb(37,99,235,0.08)]"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Pendampingan Hukum Profesional</span>
          </motion.div>

          <motion.div variants={textRevealContainer} initial="hidden" animate="visible" className="perspective-[1000px]">
            {["Melewati", "Masa Sulit,", "Menuju", "Lembaran Baru."].map((word, i) => (
              <motion.span 
                key={i} 
                variants={textRevealChild}
                className={`inline-block text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mx-2 md:mx-4 ${i >= 2 ? 'text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary' : 'text-slate-900'}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ...springTransition }}
            className="mt-10 max-w-2xl text-lg md:text-xl text-slate-600 font-light leading-relaxed"
          >
            Kami hadir memberikan ruang aman, transparan, dan penuh empati untuk membantu Anda menyusun kembali kehidupan dengan penuh harapan.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ...springTransition }}
            className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto relative z-20"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi."
              target="_blank"
              className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all"
            >
              <MessageCircle size={24} />
              Mulai Konsultasi
            </motion.a>
          </motion.div>
        </div>

        {/* Floating Elements / Stats in Hero */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotate: -5, backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
          className="hidden md:flex absolute left-10 top-1/3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-4 z-10 cursor-pointer"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary"><Shield size={24} /></div>
          <div>
            <p className="text-2xl font-black text-slate-900">100%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kerahasiaan</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "#ecfdf5", borderColor: "#a7f3d0" }}
          className="hidden md:flex absolute right-10 bottom-1/3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-4 z-10 cursor-pointer"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-secondary"><CheckCircle2 size={24} /></div>
          <div>
            <p className="text-2xl font-black text-slate-900">500+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kasus Selesai</p>
          </div>
        </motion.div>
      </section>

      {/* Marquee / Social Proof Section */}
      <div className="bg-slate-50 py-10 border-y border-slate-100 overflow-hidden flex relative z-20">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 items-center px-10"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              <span className="text-slate-400 font-bold tracking-widest uppercase text-sm">Terdaftar Resmi di Peradi</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 font-bold tracking-widest uppercase text-sm">Pendekatan Mediasi Pertama</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 font-bold tracking-widest uppercase text-sm">Transparansi Biaya 100%</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 font-bold tracking-widest uppercase text-sm">Dukungan Psikologis Klien</span>
              <span className="text-slate-300">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. BENTO GRID: LAYANAN (Soft & Trusting) */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="mb-16 flex justify-between items-end"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Layanan Terpadu</h2>
              <p className="text-slate-500 text-lg">Solusi damai untuk setiap tahapan proses hukum Anda.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Bento Box 1: Large (Blue Trust) */}
            <motion.div 
              variants={bentoHover1} whileHover="hover" whileTap="tap"
              className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-10 border border-blue-200/20 relative overflow-hidden group cursor-pointer shadow-lg shadow-blue-900/10"
              onClick={() => window.location.href = '/layanan'}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">
                <Scale size={180} strokeWidth={1} className="text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-end">
                <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1 rounded-full font-mono text-xs w-max mb-6 tracking-widest uppercase">01 / Perceraian</span>
                <h3 className="text-4xl font-extrabold text-white mb-4">Gugatan & Mediasi</h3>
                <p className="text-blue-100 max-w-lg text-lg">Pendekatan hukum presisi di Pengadilan Agama & Negeri yang mengutamakan kedamaian dan kerahasiaan Anda.</p>
              </div>
            </motion.div>

            {/* Bento Box 2: Tall (Green Hope/Healing) */}
            <motion.div 
              variants={bentoHover2} whileHover="hover" whileTap="tap"
              className="md:col-span-1 md:row-span-2 bg-emerald-50 rounded-[2.5rem] p-10 border border-emerald-100 relative overflow-hidden group cursor-pointer flex flex-col shadow-sm"
              onClick={() => window.location.href = '/layanan'}
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors duration-500 text-secondary">
                <HeartHandshake size={32} />
              </div>
              <span className="text-secondary font-bold text-sm mb-4 tracking-widest uppercase mt-auto">02 / Masa Depan Anak</span>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Hak Asuh</h3>
              <p className="text-slate-600 leading-relaxed">Fokus pada kesejahteraan dan perkembangan psikologis anak sebagai prioritas tertinggi.</p>
            </motion.div>

            {/* Bento Box 3: Small (Clean White) */}
            <motion.div 
              variants={bentoHover3} whileHover="hover" whileTap="tap"
              className="md:col-span-1 md:row-span-1 bg-white rounded-[2.5rem] p-8 border border-slate-200 group cursor-pointer shadow-sm flex flex-col justify-center"
              onClick={() => window.location.href = '/layanan'}
            >
              <Users size={32} className="text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Harta Bersama</h3>
              <p className="text-slate-500">Penyelesaian sengketa Gono-Gini yang adil, transparan, dan damai.</p>
            </motion.div>

            {/* Bento Box 4: Small CTA (Blue) */}
            <motion.div 
              variants={bentoHover4} whileHover="hover" whileTap="tap"
              className="md:col-span-1 md:row-span-1 bg-slate-50 hover:bg-primary rounded-[2.5rem] p-8 border border-slate-200 flex items-center justify-between group cursor-pointer transition-colors duration-500"
              onClick={() => window.location.href = '/layanan'}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-white transition-colors mb-1">Eksplorasi</h3>
                <p className="text-slate-500 group-hover:text-blue-100 transition-colors">Semua layanan kami</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <ArrowRight size={24} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* NEW: Proses Kerja Timeline */}
      <section className="py-32 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Transparansi</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Bagaimana Kami Bekerja</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Proses yang terstruktur, rahasia, dan mengutamakan kedamaian mental Anda dari awal hingga akhir.</p>
          </motion.div>

          <div className="relative border-l-2 border-blue-100 ml-4 md:ml-0 md:border-none">
            {/* Hidden line for desktop centered */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2"></div>
            
            {[
              { title: "Konsultasi & Asesmen", desc: "Mendengarkan duduk perkara Anda dengan empati dan menganalisa posisi hukum secara objektif.", icon: "1" },
              { title: "Mediasi Privat", desc: "Mengupayakan penyelesaian di luar pengadilan untuk meminimalisir konflik dan trauma panjang.", icon: "2" },
              { title: "Pendampingan Litigasi", desc: "Jika harus ke pengadilan, kami siapkan strategi terbaik untuk mengamankan hak-hak Anda.", icon: "3" },
              { title: "Lembaran Baru", desc: "Penyelesaian tuntas termasuk eksekusi putusan harta dan perlindungan hak asuh anak.", icon: "4" }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2, ...springTransition }}
                className={`relative flex md:justify-between items-center w-full mb-16 pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Desktop Circle */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white border-4 border-blue-100 rounded-full items-center justify-center text-xl font-black text-primary z-10 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                  {step.icon}
                </div>
                {/* Mobile Circle */}
                <div className="md:hidden absolute left-0 top-0 -translate-x-[9px] mt-1 w-5 h-5 bg-primary border-4 border-blue-100 rounded-full z-10"></div>
                
                <motion.div 
                  whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? 2 : -2, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full md:w-[45%] bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.1)] transition-shadow duration-300 cursor-pointer"
                >
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{step.desc}</p>
                </motion.div>
                <div className="hidden md:block w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERT TEAM (Clean & Trustworthy) */}
      <section className="py-32 bg-slate-50 relative z-10 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="mb-20 max-w-3xl"
          >
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Pakar Hukum</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Sahabat Perjalanan Anda.</h2>
            <p className="text-slate-600 text-xl leading-relaxed">Dipandu oleh advokat tersertifikasi yang menyeimbangkan keahlian litigasi dengan pendekatan psikologis.</p>
          </motion.div>

          <div className="flex overflow-x-auto snap-x md:grid md:grid-cols-3 gap-6 md:gap-10 pb-8 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {(lawyers.length > 0 ? lawyers : []).map((lawyer, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, ...springTransition }}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2, y: -10 }}
                whileTap={{ scale: 0.95, rotate: 0 }}
                className="group cursor-pointer bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.1)] transition-all duration-500 border border-slate-100 w-[280px] md:w-auto snap-center shrink-0 md:shrink"
                onClick={() => window.location.href = '/pengacara'}
              >
                <div className="overflow-hidden rounded-[2rem] aspect-[3/4] mb-6 relative">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={lawyer.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800"} 
                    alt={lawyer.name} 
                    className="w-full h-full object-cover transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {lawyer.degree || "Advokat"}
                  </div>
                </div>
                <div className="px-4 pb-4 text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{lawyer.name}</h3>
                  <p className="text-slate-500 font-medium">{lawyer.specialization || "Hukum Keluarga"}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Testimonials / Social Proof */}
      <section className="py-32 bg-emerald-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="container mx-auto px-4 mb-20 text-center relative z-10">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Testimoni</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Kisah Pemulihan Mereka</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Kami tidak hanya memenangkan kasus, tapi juga membantu klien kami kembali menemukan kedamaian.</p>
        </div>
        
        <div className="flex gap-6 overflow-x-auto md:overflow-visible snap-x md:animate-[scroll_40s_linear_infinite] md:w-max hover:[animation-play-state:paused] relative z-10 pb-8 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex gap-6">
              {[
                { name: "Ibu R.A.", role: "Klien Hak Asuh", text: "Prosesnya sangat transparan dan tim sangat berempati. Saya merasa benar-benar dibela tanpa ada kesan menghakimi sama sekali." },
                { name: "Bapak H.S.", role: "Klien Mediasi", text: "Saya awalnya sangat takut dengan pengadilan, tapi pendekatan persuasif mereka luar biasa. Kasus selesai damai tanpa sidang panjang." },
                { name: "Ibu M.T.", role: "Klien Harta Gono-Gini", text: "Pembagian aset diselesaikan secara adil. Mereka tahu betul celah hukum perdata sehingga saya tidak dirugikan sedikitpun." },
                { name: "Bapak D.W.", role: "Klien Hak Asuh", text: "Hak asuh anak berhasil saya dapatkan. Terima kasih atas pendekatan psikologis yang luar biasa ke mantan pasangan saya." }
              ].map((testi, idx) => (
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 3 : -3, backgroundColor: "#f0fdf4" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  key={`${j}-${idx}`} 
                  className="w-[85vw] md:w-[400px] bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-emerald-100/50 shrink-0 flex flex-col snap-center cursor-pointer hover:shadow-lg hover:border-emerald-200"
                >
                  <div className="flex gap-1 mb-6 text-yellow-400">
                    {"★★★★★"}
                  </div>
                  <p className="text-slate-600 mb-8 italic text-lg leading-relaxed grow">"{testi.text}"</p>
                  <div>
                    <p className="font-extrabold text-slate-900">{testi.name}</p>
                    <p className="text-sm font-bold text-secondary uppercase tracking-wider mt-1">{testi.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 4. ARTICLES (List View with Hover Reveal - Light) */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16 border-b border-slate-200 pb-8"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Insight Hukum</h2>
            <Link href="/artikel" className="text-primary hover:text-primary-dark transition-colors flex items-center gap-2 uppercase tracking-widest text-sm font-bold">
              Pusat Edukasi <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(articles.length > 0 ? articles : []).map((article, idx) => {
              const strippedExcerpt = (article.excerpt || "").replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&') || "Baca selengkapnya...";
              return (
              <Link href={`/artikel/${article.slug || ''}`} key={idx} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, ...springTransition }}
                  whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? -2 : 2, y: -10 }}
                  whileTap={{ scale: 0.97, rotate: 0 }}
                  className="group relative h-[350px] md:h-[400px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={article.thumbnail || "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                  <div className="relative z-20 p-6 md:p-8">
                    <span className="text-secondary font-bold text-sm mb-3 block uppercase tracking-wider">{article.category?.name || "Artikel"}</span>
                    <h3 className="text-2xl font-extrabold text-white group-hover:text-blue-200 transition-colors leading-tight mb-4">
                      {article.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500">
                      {strippedExcerpt}
                    </p>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      Baca Artikel <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            )})}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FOOTER CTA (Healing & Hopeful) */}
      <section className="py-40 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-200/40 blur-[120px] rounded-full pointer-events-none"
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={springTransition}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 md:mb-10 tracking-tighter leading-tight"
          >
            Satu Langkah Menuju <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Kedamaian Anda.</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ...springTransition }}
          >
            <a
              href="https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 md:gap-4 bg-primary text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-bold text-lg md:text-2xl hover:scale-105 transition-transform shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
            >
              Mari Berdiskusi Secara Privat <ArrowRight size={24} className="md:w-7 md:h-7" />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
