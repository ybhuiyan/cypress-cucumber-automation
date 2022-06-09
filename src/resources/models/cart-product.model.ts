export interface CartProductModel {
  id: string;
  organizationId: number;
  externalProductId: string;
  name: string;
  externalUpdatedDate: Date;
  type: ProductType;
  descriptions: string[];
  businessId?: number[];
  price?: number;
  productVariants?: CartProductVariant[];
  categories?: Category[];
  metaDataValues: string[];
  deleted?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartProductVariant {
  id: string;
  externalProductVariantId: string;
  name: string;
  type: ProductType;
  sku?: string;
  version: number;
  productId: string;
  color?: string;
  descriptions?: string[];
  deleted?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  productVariantAttributes?: CartProductVariantAttributeValue[];
  identifiers?: CartProductVariantIdentifier[];
  media?: CartMedia[];
}

export interface CartProductVariantAttributeValue {
  id: number;
  value: string;
  productVariantId: string;
  productVariantAttributeId: number;
  productVariantAttribute: CartProductVariantAttribute;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CartProductVariantAttribute {
  id: number;
  name: string;
  displayName?: string;
  description?: string;
  attributeClass: CartAttributeClass;
  attributeType: AttributeType;
  isInternal: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: number;
  name: string;
  parentId?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: Date;
}

export interface CartMedia {
  id?: number;
  url: string;
  altText?: string;
  height?: number;
  width?: number;
  type?: MediaType;
  productVariantId?: string;
}

export interface CartProductVariantIdentifier {
  id?: number;
  type?: string;
  value?: string;
  productVariantId?: string;
}

export enum MediaType {
  IMAGE,
  VIDEO,
}

export enum ProductType {
  BUNDLE = 'BUNDLE',
  ITEM = 'ITEM',
}

export enum CartAttributeClass {
  CORE = 'CORE',
  FULFILLMENT = 'FULFILLMENT',
  AMAZON = 'AMAZON',
  WALMART = 'WALMART',
}

export enum AttributeType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  BOOLEAN = 'BOOLEAN',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  DATE = 'DATE',
  METRIC = 'METRIC',
  PRICE = 'PRICE',
  IMAGE = 'IMAGE',
  MODEL = 'MODEL',
  ENUM = 'ENUM',
}

export enum CartAttributeName {
  manufacturerId,
  manufacturerPartNumber,
  primaryCategoryId,
  productStatus,
  itemNumber,
  itemName,
  type,
  height,
  length,
  width,
  sizeUnit,
  weight,
  weightUnit,
  cost,
  price,
  currency,
  tags,
  isNew,
  isHidden,
  isKit,
  isChildProduct,
  isNonInventory,
  isDiscontinued,
  isSubscriptionProduct,
  subscriptionFrequency,
  subscriptionFrequencyType,
  isLinkedProduct,
  masterProductId,
  vendorStoreId,
  etaDate,
  publishedAt,
  averageReviewRating,
  reviewCount,
}
