-- CreateTable
CREATE TABLE "AttributeGroup" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER,
    "isHidden" BOOLEAN,
    "allowDrillDown" BOOLEAN,
    "allowMultiple" BOOLEAN,
    "tieVariantInventory" BOOLEAN,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isNew" BOOLEAN
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" INTEGER NOT NULL,
    "attributeGroupId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isHidden" BOOLEAN,
    "sortOrder" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pageTitle" TEXT,
    "keywords" TEXT,
    "metaDescription" TEXT,
    "urlRewrite" TEXT,
    "isNew" BOOLEAN
);

-- CreateIndex
CREATE UNIQUE INDEX "AttributeGroup_name_key" ON "AttributeGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");
