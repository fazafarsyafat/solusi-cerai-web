import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

export default async function AdminArtikelPage() {
  const articles = await prisma.article.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Artikel</h1>
        <Link 
          href="/admin/artikel/create" 
          className="bg-primary text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Tulis Artikel Baru
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-sm">
              <th className="p-4">Judul Artikel</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  Belum ada artikel. Silakan buat baru.
                </td>
              </tr>
            ) : articles.map(article => (
              <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{article.title}</p>
                  <p className="text-xs text-slate-500">{new Date(article.createdAt).toLocaleDateString('id-ID')}</p>
                </td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                    {article.category?.name || '-'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    article.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {article.status === 'published' ? 'Publikasi' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/artikel/${article.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={18} />
                    </Link>
                    <form action={async () => {
                      "use server";
                      const { deleteArticle } = await import('./actions');
                      await deleteArticle(article.id);
                    }}>
                      <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Artikel">
                        <Trash2 size={18} />
                      </button>
                    </form>
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
