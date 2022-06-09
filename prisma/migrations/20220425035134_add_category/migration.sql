-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT,
    "sortOrder" INTEGER,
    "isHidden" BOOLEAN,
    "parentCategoryId" INTEGER,
    "maxQuantity" INTEGER,
    "categoryThumbnail" TEXT,
    "pageTitle" TEXT,
    "lookupPath" TEXT,
    "keywords" TEXT,
    "metaDescription" TEXT,
    "categoryImage" TEXT,
    "externalContentUrl" TEXT,
    "isCategoryContentDisplayed" BOOLEAN,
    "areSubcategoryProductsDisplayed" BOOLEAN,
    "urlRewrite" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultProductPicture" TEXT,
    "alternateThumbnail" TEXT,
    "headTags" TEXT,
    "catImageAltText" TEXT,
    "thumbImageAltText" TEXT,
    "vendorStoreId" INTEGER,
    "isNew" BOOLEAN
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
