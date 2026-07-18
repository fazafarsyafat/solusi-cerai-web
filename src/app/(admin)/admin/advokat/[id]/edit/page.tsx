import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditLawyerForm from "./EditLawyerForm";

export default async function EditLawyerPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const lawyer = await prisma.lawyer.findUnique({
    where: { id: parseInt(id) }
  });

  if (!lawyer) {
    notFound();
  }

  return (
    <EditLawyerForm lawyer={lawyer} />
  );
}
