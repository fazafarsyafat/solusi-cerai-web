import { prisma } from "@/lib/prisma";
import { FileText, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const articleCount = await prisma.article.count();
  const lawyerCount = await prisma.lawyer.count();

  const stats = [
    { title: "Total Artikel", value: articleCount, icon: FileText, href: "/admin/artikel", color: "bg-blue-50 text-blue-600" },
    { title: "Total Advokat", value: lawyerCount, icon: Users, href: "/admin/advokat", color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link key={idx} href={stat.href} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-slate-500 font-medium text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
