"use client";

import { useActionState } from "react";
import { createLawyer } from "../actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function CreateLawyerPage() {
  const [state, formAction, isPending] = useActionState(createLawyer, undefined);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/advokat" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tambah Profil Advokat</h1>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700">Nama Lengkap</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 font-medium" />
            </div>
            <div className="space-y-2">
              <label htmlFor="photo" className="text-sm font-bold text-slate-700">Foto Profil</label>
              <input 
                type="file" 
                id="photo" 
                name="photo"
                accept="image/*"
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-slate-900 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="degree" className="text-sm font-bold text-slate-700">Gelar (S.H., M.H., dll)</label>
            <input type="text" id="degree" name="degree" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="specialization" className="text-sm font-bold text-slate-700">Spesialisasi</label>
              <input type="text" id="specialization" name="specialization" placeholder="Hukum Keluarga, Perceraian" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-bold text-slate-700">Wilayah Praktik (Daerah)</label>
              <input type="text" id="city" name="city" placeholder="Contoh: Jakarta Selatan" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
            </div>
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-bold text-slate-700">Pengalaman (Tahun)</label>
              <input type="text" id="experience" name="experience" placeholder="10 Tahun" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Publik</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-bold text-slate-700">Telepon / WhatsApp</label>
              <input type="text" id="phone" name="phone" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="peradi_number" className="text-sm font-bold text-slate-700">Nomor PERADI (Opsional)</label>
            <input type="text" id="peradi_number" name="peradi_number" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
          </div>

          <div className="space-y-2">
            <label htmlFor="education" className="text-sm font-bold text-slate-700">Pendidikan Singkat</label>
            <input type="text" id="education" name="education" placeholder="S1 Hukum Universitas XYZ" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900" />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-bold text-slate-700">Deskripsi Singkat (Bio)</label>
            <textarea id="bio" name="bio" required rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900"></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-bold text-slate-700">Status</label>
            <select id="status" name="status" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 bg-white">
              <option value="active">Aktif Tampil di Website</option>
              <option value="inactive">Sembunyikan</option>
            </select>
          </div>

          {state?.error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
              {state.error}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-primary/20 disabled:opacity-70"
            >
              <Save size={20} />
              {isPending ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
