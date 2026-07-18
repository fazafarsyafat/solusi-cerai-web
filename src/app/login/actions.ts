"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function authenticate(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const userCount = await prisma.user.count();
      if (userCount === 0 && email === "admin@solusicerai.com" && password === "admin123") {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name: "Super Admin",
          },
        });
      } else {
        return { error: "Email tidak terdaftar di sistem kami." };
      }
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return { error: "Password yang Anda masukkan salah." };
      }
    }

    await login({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    return { error: "Terjadi kesalahan sistem." };
  }

  redirect("/admin");
}
