import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@solusicerai.com' },
    update: {},
    create: {
      email: 'admin@solusicerai.com',
      password: adminPassword,
      name: 'Administrator',
    },
  });
  console.log('Admin created:', admin.email);

  // 2. Create Article Category
  const category = await prisma.articleCategory.upsert({
    where: { slug: 'hukum-keluarga' },
    update: {},
    create: {
      name: 'Hukum Keluarga',
      slug: 'hukum-keluarga',
      description: 'Artikel seputar hukum keluarga dan perceraian di Indonesia',
    },
  });

  // 3. Create Articles
  await prisma.article.upsert({
    where: { slug: 'pentingnya-memahami-hukum-keluarga-sebelum-mengambil-keputusan-perceraian' },
    update: {},
    create: {
      title: 'Pentingnya Memahami Hukum Keluarga Sebelum Mengambil Keputusan Perceraian',
      slug: 'pentingnya-memahami-hukum-keluarga-sebelum-mengambil-keputusan-perceraian',
      thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Bandung - Hukum keluarga memiliki peran penting dalam memberikan kepastian hukum bagi setiap anggota keluarga.',
      content: '<p>Hukum keluarga memiliki peran penting dalam memberikan kepastian hukum bagi setiap anggota keluarga, terutama ketika menghadapi persoalan seperti perceraian, hak asuh anak, dan pembagian harta bersama.</p>',
      category_id: category.id,
      author_id: admin.id,
      status: 'published',
      published_at: new Date(),
    },
  });

  await prisma.article.upsert({
    where: { slug: 'syarat-dan-cara-mengajukan-gugatan-cerai-2026' },
    update: {},
    create: {
      title: 'Syarat dan Cara Mengajukan Gugatan Cerai 2026',
      slug: 'syarat-dan-cara-mengajukan-gugatan-cerai-2026',
      thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
      excerpt: 'Panduan lengkap mengenai persyaratan hukum dan prosedur pengajuan gugatan cerai di Pengadilan Agama dan Pengadilan Negeri.',
      content: '<p>Panduan lengkap mengenai persyaratan hukum dan prosedur pengajuan gugatan cerai di Pengadilan Agama dan Pengadilan Negeri.</p>',
      category_id: category.id,
      author_id: admin.id,
      status: 'published',
      published_at: new Date(),
    },
  });

  // 4. Create Lawyer
  await prisma.lawyer.upsert({
    where: { slug: 'wisnu-bayu-aji-sh' },
    update: {},
    create: {
      name: 'Wisnu Bayu Aji, SH',
      slug: 'wisnu-bayu-aji-sh',
      degree: 'S.H.',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800',
      city: 'Bandung',
      specialization: 'Hukum Keluarga, Hukum Pidana',
      experience: '11 Tahun',
      education: 'S1 Perbandingan Madzhab dan Hukum',
      peradi_number: '08-02743/PERADI-PUPA/VI/21',
      email: 'wisnubaji@gmail.com',
      phone: '081381333484',
      bio: 'Wisnu Bayu Aji, S.H. merupakan advokat sekaligus Founder Ruas Hukum & Partners yang berfokus pada penyelesaian perkara litigasi maupun nonlitigasi.\nDengan mengedepankan integritas, ketelitian, dan analisis hukum yang mendalam, ia berkomitmen memberikan pendampingan hukum yang profesional.',
      status: 'active',
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
