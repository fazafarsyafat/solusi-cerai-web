import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminAdvokatPage() {
  const lawyers = await prisma.lawyer.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Advokat</h1>
        <Link 
          href="/admin/advokat/create" 
          className="bg-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Tambah Advokat
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-sm">
              <th className="p-4">Nama & Gelar</th>
              <th className="p-4">Spesialisasi</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lawyers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  Belum ada profil advokat. Silakan tambah baru.
                </td>
              </tr>
            ) : lawyers.map(lawyer => (
              <tr key={lawyer.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{lawyer.name}</p>
                  <p className="text-xs text-slate-500">{lawyer.degree || '-'}</p>
                </td>
                <td className="p-4">
                  <span className="text-slate-700 text-sm">
                    {lawyer.specialization || '-'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    lawyer.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {lawyer.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/advokat/${lawyer.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
