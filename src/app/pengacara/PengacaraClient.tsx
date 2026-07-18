"use client";

import { motion } from "framer-motion";

import Link from "next/link";

export default function PengacaraClient({ lawyers }: { lawyers: any[] }) {

  const themeClasses: Record<string, any> = {
    blue: {
      bg: "bg-blue-50/50",
      border: "border-blue-100",
      text: "text-blue-700",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
      hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)]"
    },
    rose: {
      bg: "bg-rose-50/50",
      border: "border-rose-100",
      text: "text-rose-700",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-800",
      hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(225,29,72,0.15)]"
    },
    emerald: {
      bg: "bg-emerald-50/50",
      border: "border-emerald-100",
      text: "text-emerald-700",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      hoverShadow: "hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)]"
    }
  };

  return (
    <div className="py-32 container mx-auto px-4 bg-slate-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24"
      >
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Pakar Hukum</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Tim Pengacara Kami</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Didukung oleh advokat profesional dan berdedikasi yang siap mendampingi Anda melewati setiap proses hukum dengan amanah dan empati.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {lawyers.length > 0 ? (
          lawyers.map((lawyer, idx) => {
            const themes = ["blue", "rose", "emerald"];
            const t = themeClasses[themes[idx % themes.length]];
            return (
              <Link href={`/pengacara/${lawyer.slug}`} key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -15 }}
                  className={`${t.bg} rounded-[2.5rem] overflow-hidden shadow-sm border ${t.border} group ${t.hoverShadow} transition-all duration-500 cursor-pointer h-full`}
                >
                  <div className="aspect-[4/5] overflow-hidden relative p-4 pb-0">
                    <img 
                      src={lawyer.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800"} 
                      alt={lawyer.name} 
                      className="w-full h-full object-cover object-top rounded-[2rem] group-hover:scale-105 transition-transform duration-700 shadow-sm"
                    />
                  </div>
                  <div className="p-8 text-center flex flex-col h-[calc(100%-125%)]">
                    <h2 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors">{lawyer.name}</h2>
                    <p className={`${t.text} font-bold mb-3 tracking-wide text-sm uppercase`}>{lawyer.specialization || "Advokat"}</p>
                    
                    {lawyer.city && (
                      <p className="text-slate-500 text-sm font-medium mb-4">{lawyer.city}</p>
                    )}

                    <div className="mt-auto">
                      <span className={`inline-block ${t.badgeBg} ${t.badgeText} px-5 py-2 rounded-full text-sm font-bold shadow-sm`}>
                        {lawyer.experience || "Berpengalaman"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-xl text-slate-500 font-medium">Belum ada profil pengacara yang ditambahkan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
