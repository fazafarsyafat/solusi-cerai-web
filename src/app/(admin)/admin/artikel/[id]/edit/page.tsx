import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id: parseInt(id) }
  });

  if (!article) {
    notFound();
  }

  return (
    <EditArticleForm article={article} />
  );
}
