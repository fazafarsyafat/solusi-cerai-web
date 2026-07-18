import { prisma } from "@/lib/prisma";
import PengacaraClient from "./PengacaraClient";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const lawyers = await prisma.lawyer.findMany({
    where: { status: 'active' },
    orderBy: { createdAt: 'desc' }
  });

  return <PengacaraClient lawyers={lawyers} />;
}
