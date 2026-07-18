"use client";

import { useActionState, useState, useEffect } from "react";
import { authenticate } from "./actions";
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success("Berhasil masuk!");
      router.push("/admin");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden p-4 md:p-8">
      {/* Background Ornaments (Similar to Landing Page) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-amber-400/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row shadow-2xl shadow-blue-900/10 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white">
        
        {/* Left Side: Branding & Info */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-primary to-primary-dark p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-inner">
              <Shield size={32} className="text-white drop-shadow-md" />
            </div>
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight leading-tight">
              Portal <br/><span className="text-blue-200">Admin</span>
            </h1>
            <p className="text-blue-50/80 leading-relaxed max-w-sm">
              Sistem manajemen konten terpadu Solusi Cerai. Kelola artikel edukasi dan profil advokat dengan aman dan mudah.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 mt-12"
          >
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-full bg-blue-400/30 flex items-center justify-center shrink-0">
                <Lock size={18} className="text-blue-100" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Enkripsi 256-bit</h4>
                <p className="text-xs text-blue-200/70">Koneksi aman terlindungi</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex items-center bg-white/90 backdrop-blur-sm relative">
          {/* Subtle decoration on the form side */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
          
          <div className="w-full max-w-md mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl font-black text-slate-900 mb-2">Selamat Datang</h2>
              <p className="text-slate-500 mb-8 font-medium">Silakan masuk dengan kredensial admin Anda.</p>

              <form action={formAction} className="space-y-5">
                
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700">
                    Alamat Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="admin@solusicerai.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-sm font-bold text-slate-700 flex justify-between">
                    <span>Password</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 focus:outline-none transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {state?.error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="bg-red-50 text-red-600 text-sm p-3 rounded-xl flex items-center gap-3 overflow-hidden border border-red-100 font-medium"
                    >
                      <Shield size={16} className="shrink-0" />
                      {state.error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-white font-bold bg-primary hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group mt-8 relative overflow-hidden"
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  
                  {isPending ? (
                    <span className="flex items-center gap-2 relative z-10">
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 relative z-10">
                      Masuk ke Dasbor
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
