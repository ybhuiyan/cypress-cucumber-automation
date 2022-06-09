import { ProductType, CartProductVariantAttributeValue, Category, CartMedia } from './cart-product.model';
export interface ProductFlatModel {
    cartProductId: string;
    organizationId: number;
    externalProductId: string;
    name: string;
    extUpdateDate: string;
    type: ProductType;
    descriptions: string[];
    manufacturer?: string;
    businessId?: number[];
    price?: number;
    productVariantId: string;
    productVariantName: string;
    sku?: string;
    productVariantType: ProductType;
    version: number;
    color?: string;
    productVariantDescriptions?: string[];
    deleted?: Date;
    productVariantAttributes?: CartProductVariantAttributeValue[];
    categories?: Category[];
    media?: CartMedia[];
    isKit: boolean;
}
