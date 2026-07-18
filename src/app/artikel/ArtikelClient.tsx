"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

export default function ArtikelClient({ articles }: { articles: any[] }) {

  return (
    <div className="py-32 container mx-auto px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24"
      >
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Pusat Informasi</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Edukasi Hukum</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Kumpulan artikel, panduan praktis, dan wawasan mendalam untuk membantu Anda memahami hak-hak hukum Anda dengan lebih baik.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {articles.length > 0 ? (
          articles.map((article, idx) => {
            const date = article.published_at ? new Date(article.published_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "-";
            const strippedExcerpt = (article.excerpt || "").replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&') || "Baca selengkapnya...";
            return (
              <Link href={`/artikel/${article.slug}`} key={idx} className="block">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] transition-all duration-500 flex flex-col justify-end cursor-pointer"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={article.thumbnail || "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90"></div>
                  
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="flex justify-between items-center mb-auto opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">{article.category?.name || "Artikel"}</span>
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">{date}</span>
                    </div>
                    
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-secondary font-bold text-sm mb-3 block uppercase tracking-wider group-hover:hidden">{article.category?.name || "Artikel"}</span>
                      <h2 className="text-2xl font-extrabold text-white group-hover:text-blue-200 transition-colors leading-tight mb-4">{article.title}</h2>
                      
                      <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">{strippedExcerpt}</p>
                      </div>

                      <button className="text-white font-bold flex items-center gap-2 group-hover:text-secondary transition-colors uppercase tracking-widest text-sm">
                        Baca Selengkapnya <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-20">
            <p className="text-xl text-slate-500 font-medium">Belum ada artikel edukasi yang ditambahkan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
