const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding....");

  // User (Admin & Staff)
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: "12345",
      role: "ADMIN"
    }
  });

  const staff = await prisma.user.create({
    data: {
      username: "staff",
      password: "12345",
      role: "STAFF"
    }
  });

  // Supplier
  const supplier1 = await prisma.supplier.create({
    data: {
      name: "PT Sumber Elektronik",
      contact: "0812345678",
      email: "sumber@vendor.com",
      address: "Jakarta"
    }
  });

  // Category
  const category1 = await prisma.category.create({
    data: { name: "Elektronik" }
  });

  const category2 = await prisma.category.create({
    data: { name: "Alat Tulis" }
  });

  // Product
  const product1 = await prisma.product.create({
    data: {
      name: "Laptop Lenovo ThinkPad",
      sku: "LTP-001",
      stock: 10,
      price: 8500000,
      supplierId: supplier1.id,
      categoryId: category1.id
    }
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Bolpoin Pilot",
      sku: "BPN-001",
      stock: 50,
      price: 5000,
      categoryId: category2.id
    }
  });

  // Transaction (Barang Masuk & Keluar)
  await prisma.transactions.create({
    data: {
      type: "IN",
      quantity: 5,
      note: "Restock Laptop",
      productId: product1.id,
      userId: admin.id
    }
  });

  await prisma.transactions.create({
    data: {
      type: "IN",
      quantity: 50,
      note: "Restock Bolpoin",
      productId: product2.id,
      userId: staff.id
    }
  });

  await prisma.transactions.create({
    data: {
      type: "OUT",
      quantity: 2,
      note: "Penjualan Laptop",
      productId: product1.id,
      userId: staff.id
    }
  });

  console.log("Seeding done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
