import { Request, Response } from "express";
import { ProductService } from "../services/product.services";
import { Prisma } from "@prisma/client";
import { responseStatusMsg } from "../helper/response";

const productService = new ProductService();

export class ProductController {
  //create controller
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { prd_name, prd_price, prd_stock, prd_description } = req.body;
      const data: Prisma.ProductCreateInput = {
        prd_name,
        prd_price,
        prd_stock,
        prd_description,
        isDelete: false,
      };
      const product = await productService.createProduct(data);
      responseStatusMsg(res, 200, "Ok", "success_data", product);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  //get all product controller
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { search, page, limit, price } = req.query;
      const product = await productService.getAllProduct(
        search as string,
        +price,
        +page,
        +limit
      );
      responseStatusMsg(res, 200, "Ok", "success_data", product);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  //get all active controller
  async getAllActived(req: Request, res: Response): Promise<void> {
    try {
      const { search, page, limit } = req.query;
      const product = await productService.getProductActived(
        search as string,
        +page,
        +limit
      );
      responseStatusMsg(res, 200, "Ok", "success_data", product);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  //get product by id controller
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productService.getProductId(+id);
      responseStatusMsg(res, 200, "Ok", "success_data", product);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  //update product controller
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { prd_name, prd_price, prd_stock, prd_description } = req.body;
      const data: Prisma.ProductUpdateInput = {
        prd_name,
        prd_price,
        prd_stock,
        prd_description,
      };
      const product = await productService.updateProduct(+id, data);
      responseStatusMsg(res, 200, "Ok", "success_data", product);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  //soft delete controller
  async updateActive(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isDelete } = req.body;
      const product = await productService.updateProductActive(+id, isDelete);
      responseStatusMsg(res, 200, "Ok", "success_data", product);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  //delete controlle
  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await productService.deleteProduct(+id);
      responseStatusMsg(res, 200, `product ${id} already removed`);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
}
