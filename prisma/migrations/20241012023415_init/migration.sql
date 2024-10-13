-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "prd_name" TEXT NOT NULL,
    "prd_price" INTEGER NOT NULL,
    "prd_stock" INTEGER NOT NULL,
    "prd_description" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
