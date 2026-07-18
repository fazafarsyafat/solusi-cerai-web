"use client";

import { Trash2 } from "lucide-react";
import { deleteArticle } from "./actions";
import toast from "react-hot-toast";

export default function DeleteArticleButton({ id }: { id: number }) {
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    
    const loadingToast = toast.loading("Menghapus...");
    try {
      const res = await deleteArticle(id);
      if (res?.error) {
        toast.error(res.error, { id: loadingToast });
      } else {
        toast.success("Artikel berhasil dihapus!", { id: loadingToast });
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem", { id: loadingToast });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
      title="Hapus Artikel"
    >
      <Trash2 size={18} />
    </button>
  );
}
