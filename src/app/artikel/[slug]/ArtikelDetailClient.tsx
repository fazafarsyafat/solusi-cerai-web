"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, ChevronRight, Link as LinkIcon } from "lucide-react";

export default function ArtikelDetailClient({ article, relatedArticles }: { article: any, relatedArticles: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const date = article.published_at ? new Date(article.published_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-";

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* 1. IMMERSIVE HERO HEADER */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-slate-900 flex items-end">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <img 
            src={article.thumbnail || "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1920"} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Link href="/artikel" className="text-blue-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
                <ArrowLeft size={16} /> Kembali
              </Link>
              <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{article.category?.name || "Artikel"}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-slate-600">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" alt="Author" className="w-full h-full object-cover" />
                </div>
                <span>Tim Redaksi Solusi Cerai</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {article.reading_time || 5} Menit Baca
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* 2. MAIN CONTENT (TEMPO.CO STYLE) */}
          <div className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary prose-img:rounded-3xl prose-img:shadow-lg prose-p:leading-relaxed prose-p:text-slate-700">
            {article.excerpt && (
              <p className="text-xl md:text-2xl text-slate-600 font-medium italic mb-10 border-l-4 border-primary pl-6">
                {article.excerpt.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')}
              </p>
            )}
            
            <div className="break-words overflow-hidden w-full [&>p]:break-words [&>p]:whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: (article.content || '').replace(/&nbsp;/g, ' ') }} />
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 font-bold text-slate-900">
              <Share2 size={20} className="text-primary" />
              Bagikan Artikel Ini:
            </div>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs" title="Share FB">
                FB
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all font-bold text-xs" title="Share Twitter">
                TW
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-700 hover:text-white transition-all" title="Copy Link">
                <LinkIcon size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3. RELATED ARTICLES (BOTTOM) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 pt-16 border-t border-slate-200"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-extrabold text-slate-900">Berita Terkait</h3>
            <Link href="/artikel" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Lihat Semua <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((rel, idx) => {
              const relDate = rel.published_at ? new Date(rel.published_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "-";
              return (
                <Link href={`/artikel/${rel.slug}`} key={idx} className="group block">
                  <div className="w-full h-48 rounded-3xl overflow-hidden bg-slate-100 mb-4">
                    <img 
                      src={rel.thumbnail || "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400"} 
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-xs font-bold text-primary mb-2 block uppercase tracking-wider">{rel.category?.name || "Artikel"}</span>
                  <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <span className="text-sm text-slate-500 font-medium">{relDate}</span>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
