const { PrismaClient } = require("@prisma/client");
const fs = require("fs-extra");
const path = require("path");

const prisma = new PrismaClient();
const productsPath = path.join(process.cwd(), "app/data/products.json");
const usersPath = path.join(process.cwd(), "app/data/users.json");

async function main() {
  try {
    const users = await fs.readJSON(usersPath);
    const products = await fs.readJSON(productsPath);

    for (const user of users) await prisma.user.create({ data: user });
    for (const product of products)
      await prisma.product.create({ data: product });

    console.log("Data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Error in main function:", e);
  process.exit(1);
});
