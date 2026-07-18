"use client";

import { Trash2 } from "lucide-react";
import { deleteLawyer } from "./actions";
import toast from "react-hot-toast";

export default function DeleteLawyerButton({ id }: { id: number }) {
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus profil advokat ini?")) return;
    
    const loadingToast = toast.loading("Menghapus...");
    try {
      const res = await deleteLawyer(id);
      if (res?.error) {
        toast.error(res.error, { id: loadingToast });
      } else {
        toast.success("Advokat berhasil dihapus!", { id: loadingToast });
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem", { id: loadingToast });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
      title="Hapus Advokat"
    >
      <Trash2 size={18} />
    </button>
  );
}
