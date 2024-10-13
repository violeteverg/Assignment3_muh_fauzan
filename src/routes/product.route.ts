import { Router, Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = Router();

export interface IProductController {
  create(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getProductById(req: Request, res: Response): Promise<void>;
  getAllActived(req: Request, res: Response): Promise<void>;
  updateProduct(req: Request, res: Response): Promise<void>;
  updateActive(req: Request, res: Response): Promise<void>;
  deleteProduct(req: Request, res: Response): Promise<void>;
}
const productController: IProductController = new ProductController();

productRouter.post("/create", productController.create);
productRouter.get("/all", productController.getAll);
productRouter.get("/all/:id", productController.getProductById);
productRouter.get("/active", productController.getAllActived);
productRouter.patch("/update/:id", productController.updateProduct);
productRouter.patch("/active/:id", productController.updateActive);
productRouter.delete("/delete/:id", productController.deleteProduct);

export default productRouter;
