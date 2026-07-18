import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  const lawyers = await prisma.lawyer.findMany({
    where: { status: 'active' },
    take: 3
  });

  return (
    <HomeClient articles={articles} lawyers={lawyers} />
  );
}
