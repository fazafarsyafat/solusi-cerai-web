import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ArtikelDetailClient from "./ArtikelDetailClient";

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug, status: 'published' },
    include: { category: true }
  });

  if (!article) {
    notFound();
  }

  const relatedArticles = await prisma.article.findMany({
    where: { 
      status: 'published',
      id: { not: article.id },
      category_id: article.category_id
    },
    include: { category: true },
    orderBy: { published_at: 'desc' },
    take: 3
  });

  return <ArtikelDetailClient article={article} relatedArticles={relatedArticles} />;
}
