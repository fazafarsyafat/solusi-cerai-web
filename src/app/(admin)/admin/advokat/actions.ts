"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

import { writeFile } from "fs/promises";
import path from "path";

export async function createLawyer(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const degree = formData.get("degree") as string;
  const specialization = formData.get("specialization") as string;
  const city = formData.get("city") as string;
  const experience = formData.get("experience") as string;
  const education = formData.get("education") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const peradi_number = formData.get("peradi_number") as string;
  const status = formData.get("status") as string;
  const photoFile = formData.get("photo") as File;
  
  if (!name || !bio) {
    return { error: "Nama lengkap dan deskripsi singkat wajib diisi." };
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  let photo = null;
  if (photoFile && photoFile.size > 0) {
    const bytes = await photoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    photo = `data:${photoFile.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;
  }

  try {
    await prisma.lawyer.create({
      data: {
        name,
        slug,
        bio,
        degree,
        specialization,
        city,
        experience,
        education,
        email,
        phone,
        peradi_number,
        photo,
        status: status || "active",
      }
    });
  } catch (error) {
    return { error: "Gagal menyimpan data advokat." };
  }

  revalidatePath('/admin/advokat');
  revalidatePath('/pengacara');
  redirect('/admin/advokat');
}

export async function updateLawyer(id: number, prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const degree = formData.get("degree") as string;
  const specialization = formData.get("specialization") as string;
  const city = formData.get("city") as string;
  const experience = formData.get("experience") as string;
  const education = formData.get("education") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const peradi_number = formData.get("peradi_number") as string;
  const status = formData.get("status") as string;
  const photoFile = formData.get("photo") as File;
  
  if (!name || !bio) {
    return { error: "Nama lengkap dan deskripsi singkat wajib diisi." };
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  let photo = undefined;
  if (photoFile && photoFile.size > 0) {
    const bytes = await photoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    photo = `data:${photoFile.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;
  }

  try {
    await prisma.lawyer.update({
      where: { id },
      data: {
        name,
        slug,
        bio,
        degree,
        specialization,
        city,
        experience,
        education,
        email,
        phone,
        peradi_number,
        ...(photo && { photo }),
        status: status || "active",
      }
    });
  } catch (error: any) {
    console.error("Update lawyer error:", error);
    return { error: `Gagal memperbarui advokat: ${error.message}` };
  }

  revalidatePath('/admin/advokat');
  revalidatePath('/pengacara');
  redirect('/admin/advokat');
}

export async function deleteLawyer(id: number) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.lawyer.delete({
      where: { id }
    });
    revalidatePath('/admin/advokat');
    revalidatePath('/pengacara');
  } catch (error) {
    return { error: "Gagal menghapus data advokat." };
  }
}
