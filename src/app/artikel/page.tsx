import { prisma } from "@/lib/prisma";
import ArtikelClient from "./ArtikelClient";

export const dynamic = 'force-dynamic';

export default async function ArtikelPage() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    include: { category: true },
    orderBy: { published_at: 'desc' }
  });

  return <ArtikelClient articles={articles} />;
}
