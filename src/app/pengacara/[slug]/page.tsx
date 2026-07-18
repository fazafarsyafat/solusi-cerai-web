import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PengacaraDetailClient from "./PengacaraDetailClient";

export const dynamic = 'force-dynamic';

export default async function DetailPengacaraPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const lawyer = await prisma.lawyer.findUnique({
    where: { slug: resolvedParams.slug, status: 'active' }
  });

  if (!lawyer) {
    notFound();
  }

  return <PengacaraDetailClient lawyer={lawyer} />;
}
