"use client";

import { useActionState, useState, useEffect } from "react";
import { updateArticle } from "../../actions";
import Editor from "@/components/Editor";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import imageCompression from 'browser-image-compression';

export default function EditArticleForm({ article }: { article: any }) {
  // Bind the article ID to the action
  const updateArticleWithId = updateArticle.bind(null, article.id);
  const [state, formAction, isPending] = useActionState(updateArticleWithId, undefined);
  
  const [content, setContent] = useState(article.content || "");
  const [isCompressing, setIsCompressing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success("Artikel berhasil diperbarui!");
      router.push("/admin/artikel");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCompressing(true);
    
    const formData = new FormData(e.currentTarget);
    const file = formData.get("thumbnail") as File;
    
    if (file && file.size > 0) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Ukuran gambar maksimal 10 MB!");
        setIsCompressing(false);
        return;
      }

      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1200,
          useWebWorker: false,
        };
        const compressedFile = await imageCompression(file, options);
        formData.set("thumbnail", compressedFile, compressedFile.name || "thumbnail.jpg");
      } catch (error: any) {
        console.error("Compression error:", error);
        toast.error("Gagal memproses gambar: " + (error?.message || "Unknown error"));
        setIsCompressing(false);
        return;
      }
    }
    
    import("react").then(({ startTransition }) => {
      startTransition(() => {
        formAction(formData);
        setIsCompressing(false);
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/artikel" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-slate-600" />
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Edit Artikel</h1>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-bold text-slate-700">Judul Artikel</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                defaultValue={article.title}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-slate-900 font-medium"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="thumbnail" className="text-sm font-bold text-slate-700">Gambar Thumbnail (Opsional)</label>
              {article.thumbnail && (
                <div className="mb-2 text-xs text-slate-500">
                  Thumbnail saat ini: <img src={article.thumbnail} alt="thumb" className="h-10 mt-1 rounded border border-slate-200" />
                </div>
              )}
              <input 
                type="file" 
                id="thumbnail" 
                name="thumbnail"
                accept="image/*"
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-slate-900 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="category_id" className="text-sm font-bold text-slate-700">Kategori</label>
              <select 
                id="category_id" 
                name="category_id" 
                defaultValue={article.category_id}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-slate-900 bg-white"
              >
                <option value="">Pilih Kategori</option>
                <option value="1">Hukum Keluarga</option>
                <option value="2">Perceraian</option>
                <option value="3">Hak Asuh Anak</option>
                <option value="4">Harta Gono Gini</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-bold text-slate-700">Status</label>
              <select 
                id="status" 
                name="status"
                defaultValue={article.status}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-slate-900 bg-white"
              >
                <option value="draft">Simpan sebagai Draft</option>
                <option value="published">Publikasi</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Isi Artikel</label>
            <input type="hidden" name="content" value={content} />
            <Editor value={content} onChange={setContent} />
          </div>

          {state?.error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
              {state.error}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit" 
              disabled={isPending || isCompressing}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-primary/20 disabled:opacity-70"
            >
              <Save size={20} />
              {isCompressing ? "Memproses Gambar..." : (isPending ? "Menyimpan..." : "Simpan Perubahan")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
