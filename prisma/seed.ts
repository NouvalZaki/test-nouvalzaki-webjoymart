// prisma/seed.js (Sekarang JavaScript murni!)
// Menggunakan require() untuk mengimpor PrismaClient
import{PrismaClient} from'@prisma/client';

const prisma = new PrismaClient(); // <-- Pastikan ini ada

async function main() {
  console.log(`Memulai seeding...`);

  // ===================================
  // 1. PROMO SEEDING
  // ===================================
  
  const promoData = [
    {
      title: 'Promo Diskon soklin 20%',
      description: 'Dapatkan diskon 20% untuk semua merek minyak goreng kemasan 2 liter. Berlaku hingga akhir bulan.',
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), 
      imageUrl: '/potrait/soklin.jpg',
      isActive: true,
    },
    {
      title: 'Diskon Akhir Pekan Sayuran Segar',
      description: 'Diskon 15% untuk semua sayuran organik, hanya berlaku Jumat, Sabtu, dan Minggu ini!',
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), 
      imageUrl: '/potrait/sunco.jpg',
      isActive: true,
    },
  ];

  await prisma.promo.deleteMany({}); 

  for (const p of promoData) {
    const promo = await prisma.promo.create({ data: p });
    console.log(`Membuat promo dengan ID: ${promo.id}`);
  }


  const productData = [
    {
      name: 'Indomie Goreng Satuan',
      description: 'Mie instan favorit sejuta umat. Rasa otentik Indonesia.',
      stock: 150,
      imageUrl: '/products/indomie.jpg',
      category: 'Makanan Instan',
      isFeatured: true,
    },
    {
      name: 'Aqua Botol 1500ml',
      description: 'Air mineral murni dari sumber pegunungan.',
      stock: 200,
      imageUrl: '/products/aqua.jpg',
      category: 'Minuman',
      isFeatured: false,
    },
    {
      name: 'Sabun Mandi Lifebuoy',
      description: 'Perlindungan kuman 10x lebih baik.',
      stock: 80,
      imageUrl: '/products/sabun.jpg',
      category: 'Perawatan Diri',
      isFeatured: false,
    },
  ];

await prisma.product.deleteMany({});

 for (const p of productData) {
const product = await prisma.product.create({ data: p });  
console.log(`Membuat produk dengan ID: ${product.id}`);
 }
 
 console.log(`Seeding selesai.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });