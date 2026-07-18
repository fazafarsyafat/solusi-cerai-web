"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

import { writeFile } from "fs/promises";
import path from "path";

export async function createArticle(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category_id = parseInt(formData.get("category_id") as string);
  const status = formData.get("status") as string;
  const thumbnailFile = formData.get("thumbnail") as File;
  
  if (!title || !content || !category_id) {
    return { error: "Judul, Konten, dan Kategori wajib diisi." };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  let thumbnail = null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const bytes = await thumbnailFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    thumbnail = `data:${thumbnailFile.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;
  }

  try {
    await prisma.article.create({
      data: {
        title,
        slug,
        content,
        category_id,
        thumbnail,
        author_id: session.user.id,
        status: status || "draft",
        excerpt: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
      }
    });
  } catch (error) {
    console.error(error);
    return { error: "Gagal menyimpan artikel." };
  }

  revalidatePath('/admin/artikel');
  revalidatePath('/artikel');
  return { success: true };
}

export async function updateArticle(id: number, prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category_id = parseInt(formData.get("category_id") as string);
  const status = formData.get("status") as string;
  const thumbnailFile = formData.get("thumbnail") as File;
  
  if (!title || !content || !category_id) {
    return { error: "Judul, Konten, dan Kategori wajib diisi." };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  let thumbnail = undefined;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const bytes = await thumbnailFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    thumbnail = `data:${thumbnailFile.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;
  }

  try {
    await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        category_id,
        ...(thumbnail && { thumbnail }),
        status: status || "draft",
        excerpt: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
      }
    });
  } catch (error: any) {
    console.error("Update article error:", error);
    return { error: `Gagal memperbarui artikel: ${error.message}` };
  }

  revalidatePath('/admin/artikel');
  revalidatePath('/artikel');
  return { success: true };
}

export async function deleteArticle(id: number) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.article.delete({
      where: { id }
    });
    revalidatePath('/admin/artikel');
    revalidatePath('/artikel');
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus artikel." };
  }
}
