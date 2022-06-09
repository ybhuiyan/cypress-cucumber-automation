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
export declare enum MediaType {
    IMAGE = 0,
    VIDEO = 1
}
export declare enum ProductType {
    BUNDLE = "BUNDLE",
    ITEM = "ITEM"
}
export declare enum CartAttributeClass {
    CORE = "CORE",
    FULFILLMENT = "FULFILLMENT",
    AMAZON = "AMAZON",
    WALMART = "WALMART"
}
export declare enum AttributeType {
    TEXT = "TEXT",
    TEXTAREA = "TEXTAREA",
    BOOLEAN = "BOOLEAN",
    NUMBER = "NUMBER",
    SELECT = "SELECT",
    MULTISELECT = "MULTISELECT",
    DATE = "DATE",
    METRIC = "METRIC",
    PRICE = "PRICE",
    IMAGE = "IMAGE",
    MODEL = "MODEL",
    ENUM = "ENUM"
}
export declare enum CartAttributeName {
    manufacturerId = 0,
    manufacturerPartNumber = 1,
    primaryCategoryId = 2,
    productStatus = 3,
    itemNumber = 4,
    itemName = 5,
    type = 6,
    height = 7,
    length = 8,
    width = 9,
    sizeUnit = 10,
    weight = 11,
    weightUnit = 12,
    cost = 13,
    price = 14,
    currency = 15,
    tags = 16,
    isNew = 17,
    isHidden = 18,
    isKit = 19,
    isChildProduct = 20,
    isNonInventory = 21,
    isDiscontinued = 22,
    isSubscriptionProduct = 23,
    subscriptionFrequency = 24,
    subscriptionFrequencyType = 25,
    isLinkedProduct = 26,
    masterProductId = 27,
    vendorStoreId = 28,
    etaDate = 29,
    publishedAt = 30,
    averageReviewRating = 31,
    reviewCount = 32
}
