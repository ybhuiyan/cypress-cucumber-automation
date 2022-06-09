/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `AttributeGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attribute_id_key" ON "Attribute"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeGroup_id_key" ON "AttributeGroup"("id");
