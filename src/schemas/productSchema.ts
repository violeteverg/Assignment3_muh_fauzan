import { z } from "zod";

export const productSchema = z.object({
  prd_name: z
    .string({ required_error: "product name is required" })
    .min(1)
    .max(25),
  prd_price: z.number().positive("price must be positive number"),
  prd_stock: z.number().positive("stock must be positive number"),
  prd_description: z.string().min(1).max(250),
});
