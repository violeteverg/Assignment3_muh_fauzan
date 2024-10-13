import prisma from "../src/db/prisma";
import { products } from "./data";

const load = async () => {
  try {
    await prisma.product.deleteMany();
    console.log("Deleted records in product table");

    await prisma.$queryRaw`ALTER SEQUENCE "Product_id_seq" RESTART WITH 1;`;
    console.log("Reset product id sequence to 1");

    await prisma.product.createMany({
      data: products,
    });
    console.log("Added product data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
