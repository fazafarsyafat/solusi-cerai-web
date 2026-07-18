"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, GraduationCap, Award, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function PengacaraDetailClient({ lawyer }: { lawyer: any }) {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const imageHover = {
    rest: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -2, 2, -1, 0], 
      scale: 1.02,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-50/50 to-emerald-50/50 pt-32 pb-20 relative">
        {/* Background blobs for more life */}
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/pengacara" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors mb-8 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <ArrowLeft size={16} />
              Kembali ke Daftar Pengacara
            </Link>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            {/* Left Column: Image */}
            <motion.div variants={fadeInUp} className="w-full md:w-1/3 shrink-0 perspective-[1000px]">
              <motion.div 
                initial="rest"
                whileHover="hover"
                variants={imageHover}
                className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white transform-style-3d cursor-pointer group"
              >
                <img 
                  src={lawyer.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800"} 
                  alt={lawyer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {lawyer.city && (
                      <span className="inline-flex items-center gap-1 text-white bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        <MapPin size={16} />
                        {lawyer.city}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Details */}
            <div className="w-full md:w-2/3">
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                {lawyer.name}
              </motion.h1>
              
              {lawyer.degree && (
                <motion.p variants={fadeInUp} className="text-xl text-slate-600 font-bold mb-6 uppercase tracking-widest text-primary">
                  {lawyer.degree}
                </motion.p>
              )}
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-10">
                {lawyer.specialization && (
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm border border-blue-200 text-blue-800 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm">
                    <Briefcase size={18} className="text-blue-600" />
                    {lawyer.specialization}
                  </motion.span>
                )}
                {lawyer.experience && (
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm border border-emerald-200 text-emerald-800 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm">
                    <Award size={18} className="text-emerald-600" />
                    {lawyer.experience}
                  </motion.span>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-white mb-8 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Profil Singkat</h2>
                <div className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed text-slate-600">
                  {lawyer.bio.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lawyer.education && (
                  <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-white transition-all duration-300">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-5">
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="font-extrabold text-xl text-slate-900 mb-2">Pendidikan</h3>
                    <p className="text-slate-600 font-medium">{lawyer.education}</p>
                  </motion.div>
                )}
                
                {lawyer.peradi_number && (
                  <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-white transition-all duration-300">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-5">
                      <Award size={24} />
                    </div>
                    <h3 className="font-extrabold text-xl text-slate-900 mb-2">Lisensi Peradi</h3>
                    <p className="text-slate-600 font-medium">{lawyer.peradi_number}</p>
                  </motion.div>
                )}

                <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl shadow-slate-900/20 md:col-span-2 text-white relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                  
                  <h3 className="font-extrabold text-2xl mb-8 relative z-10">Informasi Kontak</h3>
                  <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                    {lawyer.email && (
                      <motion.a whileHover={{ scale: 1.02 }} href={`mailto:${lawyer.email}`} className="flex-1 flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors font-medium border border-white/10">
                        <div className="bg-white/20 p-3 rounded-full text-white">
                          <Mail size={20} />
                        </div>
                        <span className="truncate">{lawyer.email}</span>
                      </motion.a>
                    )}
                    {lawyer.phone && (
                      <motion.a whileHover={{ scale: 1.02 }} href={`https://wa.me/${lawyer.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center gap-4 bg-green-500/20 hover:bg-green-500/30 text-green-50 p-4 rounded-2xl transition-colors font-bold border border-green-500/30">
                        <div className="bg-green-500 p-3 rounded-full text-white shadow-lg shadow-green-500/30">
                          <Phone size={20} />
                        </div>
                        {lawyer.phone}
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
