"use client";

import { motion } from "framer-motion";
import { Scale, HeartHandshake, ShieldAlert, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LayananPage() {
  const services = [
    {
      title: "Gugatan Perceraian",
      desc: "Pendampingan hukum profesional dalam pengajuan gugatan cerai di Pengadilan Agama maupun Pengadilan Negeri.",
      icon: <Scale size={40} />,
      waLink: "https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi%20mengenai%20Gugatan%20Perceraian.",
      bgColor: "bg-blue-50/80",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      hoverIconBg: "group-hover:bg-blue-600",
      borderColor: "border-blue-100"
    },
    {
      title: "Hak Asuh Anak (Hadhanah)",
      desc: "Memperjuangkan hak asuh anak agar jatuh kepada pihak yang paling layak demi masa depan anak.",
      icon: <HeartHandshake size={40} />,
      waLink: "https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi%20mengenai%20Hak%20Asuh%20Anak.",
      bgColor: "bg-rose-50/80",
      iconColor: "text-rose-600",
      iconBg: "bg-rose-100",
      hoverIconBg: "group-hover:bg-rose-600",
      borderColor: "border-rose-100"
    },
    {
      title: "Harta Gono-Gini",
      desc: "Penyelesaian sengketa pembagian harta bersama selama masa perkawinan secara adil dan transparan.",
      icon: <Home size={40} />,
      waLink: "https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi%20mengenai%20Harta%20Gono-Gini.",
      bgColor: "bg-amber-50/80",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
      hoverIconBg: "group-hover:bg-amber-600",
      borderColor: "border-amber-100"
    },
    {
      title: "Kekerasan Dalam Rumah Tangga",
      desc: "Perlindungan hukum dan pendampingan bagi korban KDRT untuk mendapatkan keadilan dan keamanan.",
      icon: <ShieldAlert size={40} />,
      waLink: "https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi%20mengenai%20Kekerasan%20Dalam%20Rumah%20Tangga%20(KDRT).",
      bgColor: "bg-emerald-50/80",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      hoverIconBg: "group-hover:bg-emerald-600",
      borderColor: "border-emerald-100"
    }
  ];

  return (
    <div className="py-32 container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24"
      >
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Fokus Kami</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Layanan Kami</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Kami menyediakan berbagai layanan hukum untuk menyelesaikan masalah keluarga Anda dengan cara terbaik, profesional, dan bermartabat.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((srv, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`${srv.bgColor} p-12 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border ${srv.borderColor} flex flex-col items-start group relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-64 h-64 ${srv.iconBg} rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none transition-all duration-700 group-hover:scale-150`}></div>
            <div className={`relative z-10 ${srv.iconColor} ${srv.iconBg} p-5 rounded-3xl mb-8 ${srv.hoverIconBg} group-hover:text-white transition-all duration-500 group-hover:shadow-xl`}>
              {srv.icon}
            </div>
            <h2 className="relative z-10 text-2xl font-bold text-slate-900 mb-4">{srv.title}</h2>
            <p className="relative z-10 text-slate-700 leading-relaxed mb-6 flex-1">{srv.desc}</p>
            <a href={srv.waLink} target="_blank" rel="noopener noreferrer" className={`relative z-10 ${srv.iconColor} font-bold flex items-center gap-2 hover:opacity-75 transition-opacity`}>
              Konsultasi Masalah Ini <ArrowRight size={20} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
