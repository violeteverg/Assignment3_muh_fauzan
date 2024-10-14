import { Prisma, PrismaClient } from "@prisma/client";
import { productSchema } from "../schemas/productSchema";
import { paginate } from "../helper/pagination";
import prisma from "../db/prisma";

export class ProductService {
  //create product
  async createProduct(data: Prisma.ProductCreateInput) {
    const validationData = productSchema.parse(data);
    const product = await prisma.product.create({
      data: {
        prd_name: validationData.prd_name,
        prd_price: validationData.prd_price,
        prd_stock: validationData.prd_stock,
        prd_description: validationData.prd_description,
        isDelete: false,
      },
    });
    return product;
  }
  //get all product
  async getAllProduct(
    search: string,
    price: number,
    page: number,
    limit: number
  ) {
    const products = await prisma.product.findMany({
      where: {
        ...(search && {
          OR: [
            {
              prd_name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prd_description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
        //challenge 2: filter dari price
        ...(price > 0 && {
          prd_price: {
            equals: price,
          },
        }),
        prd_stock: { gt: 0 },
        isDelete: false,
      },
    });

    const { data, pagination } = paginate(products, page, limit);

    // challenge 1:Menghitung totalPrice
    const totalPrice = data.reduce((acc: number, cur: any) => {
      return acc + cur.prd_price;
    }, 0);

    return { data, totalPrice, pagination };
  }

  //get product active
  async getProductActived(search: string, page: number, limit: number) {
    const product = await prisma.product.findMany({
      where: {
        ...(search && {
          OR: [
            {
              prd_name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              prd_description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
        // prd_stock: { gt: 0 },
      },
    });
    const { data, pagination } = paginate(product, page, limit);
    return { data, pagination };
  }
  //get produt by id
  async getProductId(id: number) {
    const product = await prisma.product.findUnique({ where: { id: id } });
    if (!product) {
      throw new Error(`product with id ${id} not found in database`);
    }
    return product;
  }
  //update product
  async updateProduct(id: number, data: Prisma.ProductUpdateInput) {
    const productId = await prisma.product.findUnique({ where: { id: id } });
    if (!productId) {
      throw new Error(`product with id ${id} not found on database`);
    }
    console.log(productId, "<<<");
    //challenge 3: dapatkan previous data sebelum di update
    let prevData: any = {};
    if (data.prd_name) {
      prevData["prd_name"] = productId.prd_name;
    }
    if (data.prd_price) {
      prevData["prd_price"] = productId.prd_price;
    }
    const product = await prisma.product.update({
      where: { id: id },
      data: data,
    });
    return { product, prevData };
  }
  //update product ative
  async updateProductActive(id: number, isDelete: boolean) {
    const productId = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!productId) {
      throw new Error(`product with id ${id} not found on database`);
    }
    const product = await prisma.product.update({
      where: { id: id },
      data: { isDelete: isDelete },
    });
    return product;
  }
  //delete product
  async deleteProduct(id: number) {
    const productId = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!productId) {
      throw new Error(`product with id ${id} not found on database`);
    }
    const product = await prisma.product.delete({ where: { id: id } });
    return product;
  }
}
//challenge
